package com.topic.action;

import com.common.database.*;
import com.topic.model.*;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

import java.sql.*;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.log4j.Logger;
import org.apache.struts2.interceptor.ServletRequestAware;

public class loading_action extends ActionSupport implements
		ServletRequestAware {
	private static final long serialVersionUID = -8630551917022408577L;
	private String rows;
	private String maxdays;
	private String linage;
	private String message;
	private CustomProperties custom;
	private HttpServletRequest request;
	private Logger logeer1;
	private String username;
	private String password;
	private String error;
	private String userpower;
	private OperateType operate;

	public String getUserpower() {
		return userpower;
	}

	public void setUserpower(String userpower) {
		this.userpower = userpower;
	}

	public void setServletRequest(HttpServletRequest arg0) {
		this.request = arg0;
	}

	public loading_action() {
		super();
		custom = new CustomProperties();
		logeer1 = Logger.getLogger(loading_action.class);
	}

	public String getRows() {
		return rows;
	}

	public void setRows(String rows) {
		this.rows = rows;
	}

	public String uppass() throws SQLException {
		User user;
		ActionContext context = ActionContext.getContext();
		Map session = context.getSession();
		user = (User) session.get("user");
		if (user == null) {
			error = "用户登录后太长时间没有操作，请重新登录！";
			return "loginerror";
		}
		return "uppass";
	}

	public String logout() throws SQLException {
		ActionContext context = ActionContext.getContext();
		Map session = context.getSession();
		session.clear();
		return "logout";
	}

	/**
	 * 检验用户身份json
	 * 
	 * @return{"reccount":"n","rows":["code":"xxx","name","yyy","password","zzz"]}
	 * @throws SQLException
	 */
	public String userlogin() throws SQLException {
		String list = "";
		// 获取数据
		try {
			String sql;
			int recount;
			JSONArray array;
			JSONObject obj;
			JSONObject json;
			User user;
			DBHelper dbHelper = new DBHelper();
			sql = "SELECT code,name,pwd as password,get_menu_list('" + username
					+ "') as userpower FROM t_sysuser WHERE code='"
					+ username + "'";
			logeer1.warn("sql:" + sql);
			dbHelper.setCon();
			list = dbHelper.executeQuery(sql);
			logeer1.warn("list:" + list);
			json = JSONObject.fromObject(list);
			recount = json.getInt("reccount");
			logeer1.warn("Write Log");
			if (recount == 0) {
				error = "查无此用户！";
				return "loginerror";
			}
			array = json.getJSONArray("rows");
			for (int i = 0; i < array.size(); i++) {
				obj = array.getJSONObject(i);
				user = (User) obj.toBean(obj, User.class);
				if (user.getPassword().equals(password)) {
					ActionContext context = ActionContext.getContext();
					Map session = context.getSession();
					session.put("user", user);
					userpower = user.getUserpower();
					username = user.getName();
					return "loginsuccess";
				}
			}
			error = "用户密码错误！";
			return "loginerror";
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "loginerror";
	}

	/*
	 * 功能：用户检验，读取session中的user对象，进行用户身份及操作权限检验
	 * 如果user对象为空，返回-1，表示用户没有登录或者已经timeout;
	 * 如果user不为空，即进行操作权限验证，如果验证失败即返回-2，表示引用户没有操作权限 正常返回0
	 */
	public int userCheck(String method) throws SQLException {
		int result = 0;
		// 用户检验
		User user;
		ActionContext context = ActionContext.getContext();
		Map session = context.getSession();
		user = (User) session.get("user");
		if (user == null) {
			result = -1;
		}
		if (!user.audit(method)) {
			result = -2;
		}
		return result;
	}

	public String verify() throws SQLException {
		String url = request.getParameter("method");
		logeer1.warn("verify Log:"+url);
		if (url != null && url.length() > 0) {
			// 用户检验
			User user;
			ActionContext context = ActionContext.getContext();
			Map session = context.getSession();
			user = (User) session.get("user");
			if (user == null) {
				error = "用户登录后太长时间没有操作，请重新登录！";
				return "timeout";
			}
			if (!user.audit(url)) {
				error = "你没有此操作的权限，请重新登录!!!！";
				return "timeout";
			}
			maxdays = custom.getMaxdays();
			linage = custom.getLinage();
			logeer1.warn("verify reutrn :"+url);
			
			return url;
		} else {
			return "timeout";
		}
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

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String passowrd) {
		this.password = passowrd;
	}

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}
}
