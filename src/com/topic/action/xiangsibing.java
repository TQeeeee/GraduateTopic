package com.topic.action;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.Action;

public class xiangsibing {
	private String fileName;

	/*public String getFileName() {
		String name="";
		try {
			name=new String(fileName.getBytes("UTF-8"),"ISO-8859-1");
			
		}catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return name;
	}*/

	/*public void setFileName(String fileName) {
		try {
			this.fileName=new String(fileName.getBytes("ISO-8859-1"),"UTF-8");
			
		}catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		//this.fileName = fileName;
	}*/
	
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public String execute() {
		
		return Action.SUCCESS ;
	}
	public InputStream getInputStream() throws FileNotFoundException {
		String path=ServletActionContext.getServletContext().getRealPath("/imformation");
		 return new FileInputStream(new File(path,fileName));
		
		
	}
}
