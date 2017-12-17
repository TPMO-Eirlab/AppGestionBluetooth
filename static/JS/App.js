var App = {
    // L'adresse de base dans laquelle on a besoin de taper éventuellement
    Address : null,

    // Le composant actuellement monté en tant que page 
    Page : null,

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
    }

  
}