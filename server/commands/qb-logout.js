/**
 * This file is part of zdiscord.
 * Copyright (C) 2021 Tony/zfbx
 * source: <https://github.com/zfbx/zdiscord>
 *
 * This work is licensed under the Creative Commons
 * Attribution-NonCommercial-ShareAlike 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/
 * or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
 */

module.exports = class cmd extends Command {
    constructor(file) {
        super("logout", file, {
            description: "send a player back to the character selection screen",
            role: "admin",

            options: [
                {
                    name: "id",
                    description: "Player's current id",
                    required: true,
                    type: djs.ApplicationCommandOptionType.Integer,
                },
            ],
        });
    }

    async run(interaction, args) {
        if (!GetPlayerName(args.id)) return interaction.sreply("This ID seems invalid.");

        QBCore.Player.Logout(args.id);
        setImmediate(() => {
            emitNet("qb-multicharacter:client:chooseChar", args.id);
        });

        zlog.info(`[${interaction.member.displayName}] logged ${GetPlayerName(args.id)} (${args.id}) out`);
        return interaction.reply(`${GetPlayerName(args.id)} (${args.id}) was sent to the character screen.`);
    }
};
