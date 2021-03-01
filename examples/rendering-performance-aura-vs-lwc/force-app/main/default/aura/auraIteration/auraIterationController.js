({
    doInit : function( component , event , helper ) 
    {
        var itemCount = 10000 ;
        var i = 0 ;
        var ret = [] ;

        while ( i < itemCount )
        {
            ret.push( { name : ''+i , value : i } ) ;
            i++ ;
        }

        component.set( "{!v.items}" , ret ) ;
    }
})
