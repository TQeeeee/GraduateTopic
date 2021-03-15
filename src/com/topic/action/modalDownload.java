package com.topic.action;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;

public class modalDownload extends ActionSupport {
	private static final String SUCCESS = null;
	private String fileName;
	private InputStream is;
	public InputStream getIs() {
		return is;
	}
	public void setIs(InputStream is) {
		this.is = is;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public String execute() throws Exception{
		//获取当前运行项目的路径
		String projectPath=ServletActionContext.getServletContext().getRealPath(File.separator);
		System.out.println(projectPath);
		System.out.println(fileName);
		String actualPath = projectPath + "modal" + File.separator + "topic_modal.xlsx";
		is = ServletActionContext.getServletContext().getResourceAsStream(actualPath);
		//is = new FileInputStream(new File(projectPath,fileName));
		fileName = new String("选题模板.xlsx".getBytes(),"ISO8859-1");
		//setIs(is);
		
		return SUCCESS;
		
	}
}
