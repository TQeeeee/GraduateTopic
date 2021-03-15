package com.topic.model;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class User {
	private String code;
	private String name;
	private String password;
	private String userpower;

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public User() {
	}

	public User(String code, String name, String password, String userpower) {
		this.code = code;
		this.password = password;
		this.name = name;
		this.userpower = userpower;
	}

	public String getUserpower() {
		return userpower;
	}

	public void setUserpower(String userpower) {
		this.userpower = userpower;
	}

	/*
	 功能：用户操作权限检验，有操作权限返回true，否则返回false
	 参数：power操作菜单编号
	 备注：用户正常登录后，其操作权限已经保存在session中。
	 */
	public boolean audit(String power) {
		String value=userpower.replace("#", "\"");
		JSONObject json = JSONObject.fromObject(value);		
		JSONArray array = json.getJSONArray("menus");
		JSONObject obj;
		for (int i = 0; i < array.size(); i++) {
			obj = array.getJSONObject(i);
			if(obj.getString("method").equals(power)) return true;
		}		
		return false;
	}
}
