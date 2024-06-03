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
        super("money", file, {
            description: "Manage player's in-city money",
            role: "admin",

            options: [
                {
                    type: djs.ApplicationCommandOptionType.Subcommand,
                    name: "add",
                    description: "add money to player",
                    options: [
                        {
                            name: "id",
                            description: "Player's current id",
                            required: true,
                            type: djs.ApplicationCommandOptionType.Integer,
                        },
                        {
                            name: "moneytype",
                            description: "type of money to add to",
                            required: true,
                            type: djs.ApplicationCommandOptionType.String,
                            choices: [
                                { name: "Cash", value: "cash" },
                                { name: "Bank", value: "bank" },
                                { name: "Crypto", value: "Crypto" },
                            ],
                        },
                        {
                            name: "amount",
                            description: "amount to add",
                            required: true,
                            type: djs.ApplicationCommandOptionType.Integer,
                        },
                    ],
                },
                {
                    type: djs.ApplicationCommandOptionType.Subcommand,
                    name: "remove",
                    description: "remove money from player",
                    options: [
                        {
                            name: "id",
                            description: "Player's current id",
                            required: true,
                            type: djs.ApplicationCommandOptionType.Integer,
                        },
                        {
                            name: "moneytype",
                            description: "type of money to remove from",
                            required: true,
                            type: djs.ApplicationCommandOptionType.String,
                            choices: [
                                { name: "Cash", value: "cash" },
                                { name: "Bank", value: "bank" },
                                { name: "Crypto", value: "Crypto" },
                            ],
                        },
                        {
                            name: "amount",
                            description: "amount to remove",
                            required: true,
                            type: djs.ApplicationCommandOptionType.Integer,
                        },
                    ],
                },
                {
                    type: djs.ApplicationCommandOptionType.Subcommand,
                    name: "set",
                    description: "set a player's money (OVERWRITE)",
                    options: [
                        {
                            name: "id",
                            description: "Player's current id",
                            required: true,
                            type: djs.ApplicationCommandOptionType.Integer,
                        },
                        {
                            name: "moneytype",
                            description: "type of money to set",
                            required: true,
                            type: djs.ApplicationCommandOptionType.String,
                            choices: [
                                { name: "Cash", value: "cash" },
                                { name: "Bank", value: "bank" },
                                { name: "Crypto", value: "Crypto" },
                            ],
                        },
                        {
                            name: "amount",
                            description: "amount to set to",
                            required: true,
                            type: djs.ApplicationCommandOptionType.Integer,
                        },
                    ],
                },
                {
                    type: djs.ApplicationCommandOptionType.Subcommand,
                    name: "inspect",
                    description: "get a player's current financial stats",
                    options: [
                        {
                            name: "id",
                            description: "Player's current id",
                            required: true,
                            type: djs.ApplicationCommandOptionType.Integer,
                        },
                    ],
                },
            ],
        });
    }

    async run(interaction, args) {
        if (!GetPlayerName(args.id)) return interaction.sreply("This ID seems invalid.");
        const player = QBCore.Functions.GetPlayer(args.id);
        const characterName = `${player.PlayerData.charinfo.firstname} ${player.PlayerData.charinfo.lastname}`;
        const reason = "Staff intervention";
        if (args.inspect) {
            const embed = new djs.EmbedBuilder().setColor(zconfig.ThemeColor).setTitle(`${characterName}'s Money`);
            let desc = "";
            Object.entries(player.PlayerData.money).forEach(([type, value]) => {
                desc += `**${type}:** $${value.toLocaleString("en-US")}\n`;
            });
            embed.setDescription(desc);
            return interaction.reply({ embeds: [ embed ] });
        }
        if (args.amount < 0) return interaction.sreply("Please only use positive amounts");
        const prevMoney = player.Functions.GetMoney(args.moneytype);
        if (args.add) {
            if (player.Functions.AddMoney(args.moneytype, args.amount, reason)) {
                zlog.info(`[${interaction.member.displayName}] Added ${args.amount} to ${GetPlayerName(args.id)} (${args.id})'s ${args.moneytype} [Previously: ${prevMoney}]`);
                return interaction.reply(`${characterName} (${args.id})'s ${args.moneytype} has increased from ${prevMoney} to ${player.Functions.GetMoney(args.moneytype)}`);
            } else {
                return interaction.reply("Something went wrong trying to add money to this player");
            }
        } else if (args.remove) {
            if (player.Functions.RemoveMoney(args.moneytype, args.amount, reason)) {
                zlog.info(`[${interaction.member.displayName}] Removed ${args.amount} from ${GetPlayerName(args.id)} (${args.id})'s ${args.moneytype} [Previously: ${prevMoney}]`);
                return interaction.reply(`${characterName} (${args.id})'s ${args.moneytype} has decreased from ${prevMoney} to ${player.Functions.GetMoney(args.moneytype)}`);
            } else {
                return interaction.reply("Something went wrong trying to remove money from this player");
            }
        } else if (args.set) {
            if (player.Functions.SetMoney(args.moneytype, args.amount, reason)) {
                zlog.info(`[${interaction.member.displayName}] Set ${GetPlayerName(args.id)} (${args.id})'s ${args.moneytype} to ${args.amount} [Previously: ${prevMoney}]`);
                return interaction.reply(`${characterName} (${args.id})'s ${args.moneytype} has been set to ${player.Functions.GetMoney(args.moneytype)} (Previously: ${prevMoney})`);
            } else {
                return interaction.reply("Something went wrong trying to set this player's money");
            }
        }
    }
};
