import { Client as DiscordTSClient, Discord, Guild, Slash, SlashOption } from "discordx";
import "reflect-metadata";
import { config as _config } from "dotenv";
_config();
import { CommandInteraction, Intents } from "discord.js";

@Discord()
abstract class App {
    @Slash("add")
    // @Guild("854844351556878336")
    add(
        @SlashOption("x", { description: "x value" })
        x: number,
        @SlashOption("y", { description: "y value" })
        y: number,

        interaction: CommandInteraction
    ) {
        interaction.reply(String(x + y));
    }
}

const client = new DiscordTSClient({
    botId: "",
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES]
});

client.login(process.env.TOKEN).then(() => {
    client.initApplicationCommands();
});

client.on("interactionCreate", (interaction) => {
    client.executeInteraction(interaction);
});