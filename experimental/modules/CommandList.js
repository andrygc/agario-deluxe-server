const Logger = require("./Logger");

class CommandsList {
    constructor() {
        // Command descriptions
        this.help.description      = "List of currently available commands.";
        this.player.description    = "List the stats of a particular player or get a list of players and their respective IDs.";
        this.minion.description    = "Give minions to a player.";
        this.addbot.description    = "Add player bots to this server.";
        this.rmbot.description     = "Remove bots from the server";
        this.kick.description      = "Kick a client from the game";
        this.killall.description   = "Remove all client cells from the game.";
        this.mass.description      = "Set the mass of a specific client."
        this.shutdown.description  = "Shutdown the server.";
        this.stats.description     = "Generate current server stats";
        this.aliases.description   = "Generate command aliases.";
        this.pause.description     = "Pause/Unpaused server.";
    }

    help(server, args) {
        const commands = Object.getOwnPropertyNames(CommandsList.prototype); // List of methods.
        commands.shift(); // Remove constructor.

        Logger.info(`The server currently supports a total of ${commands.length} commands.`);

        // Print each command and its description.
        for (const command of commands) {
            const commandObj = CommandsList.prototype[command]; // Command object

            // Ignore aliases, only print commands.
            if (CommandsList.prototype[commandObj.name] && !CommandsList.prototype[commandObj.name].isAlias) {
                console.log(`${commands.indexOf(command) + 1}. \u001B[36m${command}     \u001B[0m: ${commandObj.description}`);
            };
        };
    };

    player(server, args) {
        // Check if user needs list
        if(!args[1]) {
            Logger.info(`Mode of use: player <player "ID" || "list">`);
            return;
        } else if(!server.clients.length) {
            Logger.info(`There are no clients currently connected.`);
        }

        // Sort client IDs in descending order.
        server.clients.sort((a, b) => a.player.pID - b.player.pID);

        for(const socket of server.clients) {
            const client = socket.player;

            // Ignore disconnnected sockets and minions.
            if (!socket.isConnected || client.isMi) 
                return;

            if(args[1] && parseInt(args[1]) == client.pID) {
                Logger.info(`Info record for client with ID "${client.pID}": `);
                console.log(`\u001B[36m- isMinion      \u001B[0m: ${client.isMinion}`);
                console.log(`\u001B[36m- protocol      \u001B[0m: ${client.protocol || "none"}`);
                console.log(`\u001B[36m- remoteAdress  \u001B[0m: ${socket.remoteAddress || "none"}`);
                console.log(`\u001B[36m- spectate      \u001B[0m: ${client.spectate}`);
                console.log(`\u001B[36m- name          \u001B[0m: ${client._name || "none"}`);
                console.log(`\u001B[36m- cells         \u001B[0m: ${client.cells.length}`);
                console.log(`\u001B[36m- score         \u001B[0m: ${Math.floor(client._score)}`);
                console.log(`\u001B[36m- position      \u001B[0m: {x: ${Math.floor(client.centerPos.x)}, y: ${Math.floor(client.centerPos.y)}}`);
            } else if(args[1] == "list") {
                console.log(`\u001B[36mID ${client.pID} -->\u001B[0m "${client._name || "An unnamed cell"}"`);
            }
        }
    }

    minion(server, args) {
        const id = parseInt(args[1]);
        const amount = parseInt(args[2]) || 1;
        const name = args.splice(3).join(" ");
        
        // Command help
        if(!args[1]) {
            Logger.info(`Mode of use command "minion":`);
            console.log(`\u001B[36mminion "playerID" "totalMinions" \u001B[0m: add minions to user`);
            console.log(`\u001B[36mminion "playerID"         \u001B[0m: remove minions from user`);
        }

        if (isNaN(id)) {
            return Logger.warn(`Please, provide a numerical player ID.`);
        }
        for (let key in server.clients) {
            const client = server.clients[key].player;

            // Check if server is empty.
            if (!server.clients.length) {
                return Logger.warn("The server is empty.");
            }
            // Only use the right ID, skip all others.
            if (client.pID != id) return;
            // Remove minions if no amount is provided.
            if (client.hasMinions == true) {
                // Set hasMinions flag to false.
                client.hasMinions = false;
                return Logger.info(`Removed ${client._name}'s minions.`);
            }
            // Exclude disconnected players.
            if (!server.clients[key].isConnected) {
                return Logger.warn(`${client._name} isn't connected`)
            }
            // Add the provided (or default) amount of minions to the client specified.
            for (let i = 0; i < amount; i++) {
                server.bots.addMinion(client, name);
            }
            // Set hasMinions flag to true.
            client.hasMinions = true;

            return Logger.success(`Gave ${amount} minions to ${client._name}`);
        }
    }

    addbot(server, args) {
        const amount = parseInt(args[1]) || 1;

        // Add the provide amount of bots to the server.
        for (let i = 0; i != amount; i++) server.bots.addBot();

        return Logger.success(`Added ${amount} player bot${amount > 1 ? "s"  : ""} to the game. Use the rmbot command to remove them.`);
    }

    rmbot(server, args) {
        const amount = parseInt(args[1]) || server.clients.length;
        let total = 0;

        for (const socket of server.clients) {
            if (!socket.isConnected && total <= amount) {
                socket.close();
                return total++;
            }
        }

        return Logger.success(`Removed a total ${total} bots out of the requested amount of ${amount}.`)
    }

    kick(server, args) {
        const id = parseInt(args[1]) || args[1];
        let total = 0;

        // Check if server is empty.
        if (!server.clients.length) return Logger.warn("The server is empty.");


        for (const socket of server.clients)
            if (socket.player.pID == id || id == "all") {
                socket.close();
                return total++;
            }

        if (total > 0) {
            return Logger.success(`Kicked ${total} client${total > 1 ? "s" : ""}.`);
        } else if (total == 0 && id != "all") {
            return Logger.warn(`Please provide an amount of bots to kick. Or provide "all" to kick all bots.`)
        }
    }

    killall(server, split) {
        // Check if server is empty.
        if (!server.clients.length) {
            return Logger.warn("The server is empty.");
        }
        for (const socket of server.clients) {
            const client = socket.player;
            while (client.cells.length) server.removeNode(client.cells[0]);
        }
        return Logger.success("Removed all players.");
    }

    mass(server, args) {
        const id = parseInt(args[1]);
        const mass = Math.sqrt((parseInt(args[2])) * 100);

        if (isNaN(id)) {
            return Logger.warn(`Please provide a numerical player id.`);
        }
        if (isNaN(mass)) {
            return Logger.warn(`Please provide a numerical mass.`);
        }
        for (const socket of server.clients) {
            const client = socket.player;

            if (client.pID == id) {
                for (const cell of client.cells) cell.setSize(mass);

                return Logger.success(`Set ${client._name || "An unnamed cell"}'s mass to ${mass}`);
            }
        }
    }

    stats(server, args) {
        console.log(`\u001B[36mConnected players   \u001B[0m: ${server.clients.length} / ${server.config.serverMaxConnections}`);
        console.log(`\u001B[36mClients             \u001B[0m: ${server.clients.length}`);
        console.log(`\u001B[36mServer uptime       \u001B[0m: ${Math.floor(process.uptime() / 60)}`);
        console.log(`\u001B[36mProces memory usage \u001B[0m: ${Math.round(process.memoryUsage().heapUsed / 1048576 * 10) / 10 }/${Math.round(process.memoryUsage().heapTotal / 1048576 * 10) / 10} mb`);
        console.log(`\u001B[36mUpdate time         \u001B[0m: ${server.updateTimeAvg.toFixed(3)}ms`);
    }

    pause(server, args) {
        server.run = !server.run; // Switches the pause state
        var s = server.run ? "Unpaused" : "Paused";
        Logger.success("Server has been " + s);
    }

    shutdown(server, args) {
        const exitCode = args[1]; // Optional exit code.

        Logger.success("Exiting server...");
        return process.exit(exitCode);
    }

    aliases(server, args) {
        const commands = Object.getOwnPropertyNames(CommandsList.prototype); // List of methods.
        commands.shift(); // Remove constructor.

        for (const command of commands) {
            const commandObj = CommandsList.prototype[command]; // Command object.
            const aliasName = commandObj.name[0] + commandObj.name[commandObj.name.length - 1]; // Alias name.

            // Ignore aliases, only print commands.
            if (CommandsList.prototype[commandObj.name]) {
                CommandsList.prototype[aliasName] = (server, args) => CommandsList.prototype[commandObj.name](server, args);
                CommandsList.prototype[aliasName].isAlias = true;
            }
        }
        return Logger.success("Aliases generated.");
    }
}

module.exports = new CommandsList();
