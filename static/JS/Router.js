/**
 * Created by clovis on 11/08/17.
 */

let Router = 
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
        App.changePage("app-index", null);
    },

    ///////////////////////////////////////////////////////////////

    setRoutes : function()
    {
        route("", Router.routeIndex);
    }
}