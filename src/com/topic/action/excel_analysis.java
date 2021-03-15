package com.topic.action;
import com.topic.model.teacher_topic;

import com.topic.model.CustomProperties;
import com.topic.model.User;
import com.common.database.*;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.Map;
import org.apache.commons.io.FileUtils;
import org.apache.struts2.ServletActionContext;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;



import org.apache.log4j.Logger;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import com.google.gson.Gson;
import javax.servlet.http.HttpServletRequest;

public class excel_analysis extends ActionSupport {
	
	private  HttpServletRequest request;
	private  File file;
	public File getFile() {
		return file;
	}
	public void setFile(File file) {
		this.file = file;
	}
	public String getFileFileName() {
		return fileFileName;
	}
	public void setFileFileName(String fileFileName) {
		this.fileFileName = fileFileName;
	}
	public String getFileContentType() {
		return fileContentType;
	}
	public void setFileContentType(String fileContentType) {
		this.fileContentType = fileContentType;
	}
	private  String fileFileName;
	private String fileContentType;
	//private String savePath;
	private String result;
	
	private String error;
	private Logger logger1;
	private  File saveFile;
	private String targetFileName;
	
	public excel_analysis(){
		super();
		logger1 = Logger.getLogger(xiangsi.class);		
	}
	/**
	 *Excel文件内容被解析为Json字符串 --------文件结构只对应选题文件
	 *@author YangTianQi
	 *
	 */
	public String executeTopic(){
		System.out.println("file name is " + this.fileFileName + "");
		// 需要返回的Json字符串
		String jsonString = "";
		// 每个单元格的内容
		//String cellValue = "";
		//
		String key, value;

		// 获取第一张表
		Sheet sheet = ExcelUtil.getSheet(file, fileFileName, 0);
		// 获取行的数目
		int rowNumber = sheet.getLastRowNum();
		key = "reccount";
		value = String.valueOf(rowNumber);
		jsonString = "{\"" + key + "\":\"" + value + "\",\"rows\":[";
		for (int rowIndex = 1; rowIndex <= rowNumber; rowIndex++) {
			// 选题表有四列：选题名称，专业方向，教师姓名，选题简介
			// 从第一个单元格开始
			int cellIndex = 0;
			value = ExcelUtil.getCellValue(sheet, rowIndex, cellIndex);
			jsonString = jsonString + "{\"title\":\"" + value + "\",";
			cellIndex++;
			value = ExcelUtil.getCellValue(sheet, rowIndex, cellIndex);
			jsonString = jsonString + "\"major\":\"" + value + "\",";
			cellIndex++;
			value = ExcelUtil.getCellValue(sheet, rowIndex, cellIndex);
			jsonString = jsonString + "\"teacher\":\"" + value + "\",";
			cellIndex++;
			value = ExcelUtil.getCellValue(sheet, rowIndex, cellIndex);
			jsonString = jsonString + "\"summary\":\"" + value + "\"}";
			// 最后一行数据
			if (rowIndex != rowNumber) {
				jsonString = jsonString + ",";
			} else {
				jsonString = jsonString + "]";
			}
		}
		jsonString = jsonString + "}";
		setResult(jsonString);

		return SUCCESS;
			
		}
	
	
		
	/**
	 * 功能：解析教师表，返回json字符串
	 * @return "{"importtype":"teacher","reccount":"n","rows":[{""},{},{}]}"
	 * 
	 */
	
	public String executeTeacher() {
		System.out.println("file name is " + this.fileFileName + "");
		// 返回的json对象
		JSONObject jsonObject = new JSONObject();
		String reccount = new String();
		JSONArray rows = new JSONArray();
		// 获取第1张表
		Sheet sheet = ExcelUtil.getSheet(file, fileFileName, 0);
		// 获取最后1行的序号，也是有效记录(除去第1行的标题)的reccount
		int rowNumber = sheet.getLastRowNum();
		reccount = String.valueOf(rowNumber);
		// 每个单元格的内容
		// String cellValue = "";
		// 实际是从第2行开始
		for (int rowIndex = 1; rowIndex <= rowNumber; rowIndex++) {
			JSONObject tempobj = new JSONObject();
			// 选题表有6列：教师工号，教师姓名，专业方向，最大可带学生数，职称，类型
			int cellIndex = 0;
			// 获取当前行每个单元格的值
			tempobj.put("code", ExcelUtil.getCellValue(sheet, rowIndex, cellIndex));
			tempobj.put("name", ExcelUtil.getCellValue(sheet, rowIndex, ++cellIndex));
			tempobj.put("major", ExcelUtil.getCellValue(sheet, rowIndex, ++cellIndex));
			tempobj.put("maxnum", ExcelUtil.getCellValue(sheet, rowIndex, ++cellIndex));
			tempobj.put("level", ExcelUtil.getCellValue(sheet, rowIndex, ++cellIndex));
			tempobj.put("type", ExcelUtil.getCellValue(sheet, rowIndex, ++cellIndex));
			rows.add(tempobj);
		}
		jsonObject.put("importtype", "teacher");
		jsonObject.put("reccount", reccount);
		jsonObject.put("rows", rows);

		setResult(jsonObject.toString());

		return SUCCESS;
	}
	
	
	
	
	/**
	 * 功能：解析学生表，返回json字符串
	 * @return "{"importtype":"student","reccount":"n","rows":[{""},{},{}]}"
	 */
	
	public String executeStudent() {
		System.out.println("file name is " + this.fileFileName + "");
		// 返回的json对象
		JSONObject jsonObject = new JSONObject();
		String reccount = new String();
		JSONArray rows = new JSONArray();
		// 获取第1张表
		Sheet sheet = ExcelUtil.getSheet(file, fileFileName, 0);
		// 获取最后1行的序号，也是有效记录(除去第1行的标题)的reccount
		int rowNumber = sheet.getLastRowNum();
		reccount = String.valueOf(rowNumber);
		// 实际是从第2行开始
		for (int rowIndex = 1; rowIndex <= rowNumber; rowIndex++) {
			JSONObject tempobj = new JSONObject();
			// 选题表有3列：学号，姓名，专业
			int cellIndex = 0;
			// 获取当前行每个单元格的值
			tempobj.put("code", ExcelUtil.getCellValue(sheet, rowIndex, cellIndex));
			tempobj.put("name", ExcelUtil.getCellValue(sheet, rowIndex, ++cellIndex));
			tempobj.put("major", ExcelUtil.getCellValue(sheet, rowIndex, ++cellIndex));
			rows.add(tempobj);
		}
		jsonObject.put("importtype", "student");
		jsonObject.put("reccount", reccount);
		jsonObject.put("rows", rows);

		setResult(jsonObject.toString());

		return SUCCESS;
	}
	
	
		
		
		
	
	public String getTargetFileName() {
		return targetFileName;
	}
	public void setTargetFileName(String targetFileName) {
		this.targetFileName = targetFileName;
	}
	public String getResult() {
		return result;
	}
	public void setResult(String result) {
		this.result = result;
	}
}
