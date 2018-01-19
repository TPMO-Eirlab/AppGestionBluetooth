var App = {
    // L'adresse de base dans laquelle on a besoin de taper éventuellement
    Address : null,

    // Le composant actuellement monté en tant que page 
    Page : null,

    LoadingCounter : 0,
    connectedDevices : null,
    Devices : {
        "E0:E5:CF:1E:68:87" : new SmartPlug("E0:E5:CF:1E:68:87", "Imprimante 1", false, null, 10, 5)
    },

    /**
     * Effectue une requete Ajax et retourne une promesse.
     * address : concaténé après App.Address, addresse à interroger
     * data : données de la requête
     */
    request : function(address, data, method, redirect)
    {
        method = method == null ? "POST" : method;
        redirect = redirect == null ? true : redirect;
        return new Promise(function(resolve, reject)
        {
            var href=window.location.href;
            if(data == null)
                data = {};
            var request = ajax({
                "method" : method,
                "url" : address,
                "data" : data
            });
            request.then(function(response)
            {
                if(address.indexOf(App.Address) == -1)
                {
                    resolve(response);
                    return;
                }
                try
                {
                    ErrorHandler.handle(response);
                    resolve(response);
                }
                catch(error)
                {
                    if(error.name == ErrorHandler.State.FATAL)
                    {
                        if(redirect)
                        {
                            var message = encodeURI(error.message);
                            reject(ErrorHandler.State.FATAL);
                            route("/error/"+message);
                        }
                        else 
                        {
                            ErrorHandler.alertIfError(error);
                        }
                    }
                    else 
                        reject(error);
                }
            });

            request.catch(function(error)
            {
                var message = encodeURI("Une erreur réseau a eu lieu. Vérifiez votre connexion et réessayez.");
                reject(ErrorHandler.State.FATAL);
                route("/error/"+message);
            });
        });
    },

    /**
     * Change la page actuellement montée
     * tag : nouveau tag à monter
     * data : données à transmettre en opts au nouveau tag monté
     */
    changePage : function (tag, data)
    {
        if(App.Page != null)
        {
            App.Page.forEach(function(t)
            {
                t.unmount();
            });
            var e = document.createElement("div");
            e.id = "app";
            document.body.appendChild(e);
        }
        App.Page = riot.mount("div#app", tag, data);
        window.scroll(0,0);
    },



    showLoading : function()
    {
        App.LoadingCounter++;
        if(document.getElementById("loading") != null)
            return;
        var e = document.createElement("div");
        e.id = "loading";
        e.innerHTML = "<div></div>";
        document.body.appendChild(e);
    },

    hideLoading : function()
    {
        App.LoadingCounter--;
        if(App.LoadingCounter > 0)
            return;
        var e = document.getElementById("loading");
        if(e == null)
            return;
        e.remove();
        App.LoadingCounter = 0;
}
  
}