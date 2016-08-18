/**
 * Created by lenovo on 2016/7/16.
 */
module.exports = {
    port:process.env.PORT || 8800,
    mongo:{
        // uri:'mongodb://hjml69351:hjml69293@ds041394.mlab.com:41394/user'
        uri:'mongodb://localhost/hjl-blog'
    },
    session:{
        cookie:  {maxAge: 60000*5}
    }
    
}