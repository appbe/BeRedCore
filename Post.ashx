<%@ WebHandler Language="C#" Class="Post" %>

using System;
using System.Web;

public class Post : IHttpHandler {

    public void ProcessRequest(HttpContext context)
    {
        // Get the JSON data that's been posted
        var request = context.Request;
        string sUeID = request.QueryString.Get("uid");
        string sToken = request.QueryString.Get("token");
        string sExt = request.QueryString.Get("ext");
        string sType = context.Request.QueryString.Get("type");
        if (string.IsNullOrEmpty(sType)) sType = "json";        

        string strRet = "{\"code\":1,\"result\":\"Hello World\"}";
        context.Response.ContentType = "text/json";
        context.Response.Write(strRet);
    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}