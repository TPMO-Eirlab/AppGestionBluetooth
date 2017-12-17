/**
 * Created by clovis on 11/08/17.
 */

var Router = 
{
    redirect : function (rt)
    {
        route(rt);
    },

    start : function()
    {
        Router.setRoutes();
        route.start(true);
    },

    /////////////////////////////////////////////////////////////////
    // Définition des fonctions de route
    routeIndex : function()
    {
        App.changePage("app-printers", null);
    },

    routeConnection : function()
    {
        App.changePage("app-connection",null);
    },

    routeStats : function()
    {
        App.changePage("app-statistics", null);
    },

    routeFaq : function()
    {
        App.changePage("app-faq", null);
    },

    ///////////////////////////////////////////////////////////////

    setRoutes : function()
    {
        route("", Router.routeIndex);
        route("connexion", Router.routeConnection);
        route("stats", Router.routeStats);
        route("faq", Router.routeFaq);
    }
}