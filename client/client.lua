--[[
 - This file is part of zdiscord.
 - Copyright (C) 2021 Tony/zfbx
 - source: <https://github.com/zfbx/zdiscord>
 -
 - This work is licensed under the Creative Commons
 - Attribution-NonCommercial-ShareAlike 4.0 International License.
 - To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/
 - or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
--]]





-- zdiscord Events

RegisterNetEvent('zdiscord:kill', function()
    if not GetInvokingResource() == "zdiscord" then return end
    SetEntityHealth(PlayerPedId(), 0)
end)

RegisterNetEvent('zdiscord:teleport', function(x, y, z, withVehicle)
    if not GetInvokingResource() == "zdiscord" then return end
    -- TODO: check if active/online and not in character selector
    x = tonumber(x)
    y = tonumber(y)
    z = tonumber(z)
    if (withVehicle) then
        SetPedCoordsKeepVehicle(PlayerPedId(), x, y, z)
    else
        SetEntityCoords(PlayerPedId(), x, y, z);
    end
end)

-- Exports

local function serverOnly()
    print("[ERROR] The triggered event can only be run on the server.")
end

exports('isRolePresent', serverOnly)
exports('getDiscordId', serverOnly)
exports('getRoles', serverOnly)
exports('getName', serverOnly)
exports('log', serverOnly)
