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
        super(Lang.t("cmd_onlinecount"), file, {
            description: Lang.t("desc_onlinecount"),
        });
    }

    async run(interaction) {
        const playerNumber = GetNumPlayerIndices();
        let message = Lang.t("nobody_online");
        if (playerNumber === 1) message = Lang.t("onlinecount_one_person");
        else if (playerNumber > 1) message = Lang.t("onlinecount_total", { count: playerNumber });
        return interaction.sreply(message);
    }
};
