var Device = {
    deviceId: null, 
    name: null,
    status : null,
    controller: null,
    onerror: function (reason)
    {
        alert(reason);
    },

    init: function (id, name, updateHandler) {
        let clone = JSON.parse(JSON.stringify(Device));
        clone.deviceId = id;
        clone.name = name;
        clone.controller = new SmartPlug(dev.deviceId, devId, true, updateHandler, 1, 10);
        return clone;
    },
};