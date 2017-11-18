
let ErrorHandler =
{
    State : {
        INFO : "INFO", 
        ERROR : "ERROR",
        FATAL : "FATAL"
    },

    /**
     * On gère ici les erreurs renvoyées après une requete AJAX
     * Doit throw une erreur si un problème est détecté
     */
    handleAjax : function(response)
    {
        // On gère ici les réponses renvoyées par le serveur après une requete AJAX
    },

    /**
     * A appeler dans chaque catch après un App.request
     * Signale automatiquement l'erreur si il y a lieu de le faire 
     */
    alertIfError : function (error) 
    {
        if(error instanceof Error)
            window.alert(error.message);
    }
}