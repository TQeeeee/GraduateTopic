package com.topic.action;

import java.util.Map;
import java.io.*;
import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.apache.struts2.interceptor.ServletRequestAware;

import com.common.database.DBHelper;
import com.topic.model.User;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.topic.model.CustomProperties;
import org.apache.struts2.interceptor.ServletRequestAware;

import com.opensymphony.xwork2.ActionSupport;

public class user_delete_upd extends ActionSupport implements
ServletRequestAware {
	
	private String rows;
	private String maxdays;
	private String linage;
	private String message;
	private CustomProperties custom;
	private HttpServletRequest request;
	private Logger logger1;
	private String result;
	private String result1;
	private String error;
	
	public String getError() {
		return error;
	}
	public void setError(String error) {
		this.error = error;
	}
	public user_delete_upd(){
		super();
		logger1 = Logger.getLogger(user_delete_upd.class);
		custom = new CustomProperties();		
	}
	public void setServletRequest(HttpServletRequest arg0) {
		this.setRequest(arg0);
	}

	public String getRows() {
		return rows;
	}

	public void setRows(String rows) {
		this.rows = rows;
	}

	public String getMaxdays() {
		return maxdays;
	}

	public void setMaxdays(String maxdays) {
		this.maxdays = maxdays;
	}

	public String getLinage() {
		return linage;
	}

	public void setLinage(String linage) {
		this.linage = linage;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public CustomProperties getCustom() {
		return custom;
	}

	public void setCustom(CustomProperties custom) {
		this.custom = custom;
	}

	public HttpServletRequest getRequest() {
		return request;
	}

	public void setRequest(HttpServletRequest request) {
		this.request = request;
	}
	public String getResult() {
		return result;
	}
	public void setResult(String result) {
		this.result = result;
	}
	public String getResult1() {
		return result1;
	}
	public void setResult1(String result1) {
		this.result1 = result1;
	}
	
	////////////////正题开始
	//////////修改修改用户表及及教师或者学生表的数据
	public String execute() {
		try {
			// 用户检验
			User user;
			ActionContext context = ActionContext.getContext();
			Map session = context.getSession();
			user = (User) session.get("user");
			if (user == null) {
				setError("用户登录后太长时间没有操作，请重新登录！");
				return "timeout";
			}
			// 获取数据
			String json = request.getParameter("keyword");
			logger1.warn("json=" + json);
			JSONObject jsonObject = JSONObject.fromObject(json);
			String usertype=jsonObject.getString("usertype");
			String pk = jsonObject.getString("pk");
			String command = jsonObject.getString("command").toLowerCase();
			DBHelper dbHelper;
			dbHelper = new DBHelper();
			String sql = "";
			String sql1 = "";
			logger1.warn("pk=" + pk);
				String code;
				String name;
				if (command.equals("upd")) {
					
					code = jsonObject.getString("code");
					name = jsonObject.getString("name");
					sql = "update t_sysuser  set code='" + code + "',name='"
							+ name + "' where code='" + pk + "'";
					if(usertype.equals("0")) {
					sql1 = "update teacher  set code='" + code + "' where code='" + pk + "'";}
					else {
						sql1 = "update student  set usercode='" + code + "' where usercode='" + pk + "'";}
				}
				if (command.equals("ins")) {
					code = jsonObject.getString("code");
					name = jsonObject.getString("name");
					sql = "insert into t_sysuser (code,name) values ('" + code
							+ "','" + name + "')";
				}
				if (command.equals("del")) {
					if(usertype.equals("0")) {
						sql = "delete from  teacher where usercode='" + pk + "'";}
					else {
							sql = "delete from  student where usercode='" + pk + "'";}
					sql1 = "delete from  t_sysuser where code='" + pk + "'";
				}
				logger1.warn("sql=" + sql);
				logger1.warn("sql1=" + sql1);
				result = dbHelper.executeUpdate(sql);
				
				DBHelper dbHelper1;
				dbHelper1 = new DBHelper();
				result1 = dbHelper1.executeUpdate(sql1);
		} catch (Exception e) {
			e.printStackTrace();
			//result="{\"reccount\":\"-1\"}";
;

		}
		return SUCCESS;
		
		
	}
	
	
}
