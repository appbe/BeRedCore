<%@ WebHandler Language="C#" Class="Get" %>

using System;
using System.Web;
using System.IO;

public class Get : IHttpHandler {

    public void ProcessRequest(HttpContext context)
    {
        string sPageId = context.Request.QueryString.Get("id");
        string sUeID = context.Request.QueryString.Get("uid");
        string sToken = context.Request.QueryString.Get("token");
        string sExt = context.Request.QueryString.Get("ext");
        string sPageType = context.Request.QueryString.Get("type");
        if (string.IsNullOrEmpty(sPageType)) sPageType = "json";

        string strData = "{}";
        string strPath = context.Server.MapPath("./Assets/pages");
        string strFile = Path.Combine(strPath, sPageId + "." + sPageType);
        if (File.Exists(strFile))
        {
            StreamReader sr = new StreamReader(strFile);
            strData = sr.ReadToEnd();
            sr.Close();
        }

        context.Response.ContentType = "text/plain";
        context.Response.Write(strData);
    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}