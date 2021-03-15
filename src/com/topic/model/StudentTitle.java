package com.topic.model;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;


public class StudentTitle {
	private String code;
	private String major;
	private String student;
	private String title;
	private String summary;
	private int state; 
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getMajor() {
		return major;
	}
	public void setMajor(String major) {
		this.major = major;
	}
	public String getStudent() {
		return student;
	}
	public void setStudent(String student) {
		this.student = student;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getSummary() {
		return summary;
	}
	public void setSummary(String summary) {
		this.summary = summary;
	}
	public int getState() {
		return state;
	}
	public void setState(int state) {
		this.state = state;
	}
	
}
