package com.topic.action;

import java.io.File;
import java.sql.ResultSet;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import org.apache.commons.io.FileUtils;
import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;

import com.common.database.DBHelper;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.topic.model.CustomProperties;
import com.topic.model.User;

import net.sf.json.JSONObject;

public class FileUploadAction extends ActionSupport {

	private File file;
	// 文件名
	private String fileFileName;
	// 文件类型
	private String fileContentType;
	private String code;
	private String title;
	private String filepath;
	private Logger logger1;
	private String result;
	private String error;

	User user;
	CustomProperties custom = new CustomProperties();

	public String execute() throws Exception {

		ActionContext context = ActionContext.getContext();
		Map session = context.getSession();
		user = (User) session.get("user");
		// 设置日期格式		
		//DateFormat df = new SimpleDateFormat("yy-MM-dd HH:mm");
		//String formatDate = df.format(new Date());	
		if (user == null) {
			setError("用户登录后太长时间没有操作，请重新登录！");
			return "timeout";
		}

		// 文件保存的父目录
		// String realPath = ServletActionContext.getServletContext().getRealPath("/upload");
		String realPath = custom.getFilepath();

		// 要保存的新的文件名称
		String targetFileName = generateFileName(fileFileName);
		if (file != null) {

			File saveFile = new File(new File(realPath), targetFileName);

			if (!saveFile.getParentFile().exists())
				saveFile.getParentFile().mkdirs();
			FileUtils.copyFile(file, saveFile);
			ActionContext.getContext().put("meg", "文件上传成功！");
			ActionContext.getContext().put("filePath", targetFileName);
			//查询数据库看学生是否上传过文件
			DBHelper dbHelper1 = new DBHelper();
			String sql1 = "select student from report where student='"+ user.getCode() + "'";
			result = dbHelper1.executeQuery(sql1);
			JSONObject jsonObject = JSONObject.fromObject(result);
			int row = jsonObject.getInt("reccount");
			// 如果记录不存在插入，存在则更新
			String sql2 = "";
			DBHelper dbHelperIn = new DBHelper();
			if (row == 0) {
				/*sql2 = "insert into report(code,teacher_title,title,filepath,student,insdate)values( '" + user.getCode()
						+ "','" + title + "','" + title + "',  '" + saveFile + "', '" + user.getCode() + "', '"
						+ formatDate + "')";*/
				sql2 = "insert into report(code,teacher_title,student,title,filepath,insdate) select id,id,'" + user.getCode() + "',title,'" + targetFileName
						+ "',to_char(sysdate,'yyyy-mm-dd hh24:mi') from v_teacher_student_title where usercode='"
						+ user.getCode() + "'";


			} else {
				sql2 = "update report set  filepath='" + targetFileName
						+ "',insdate=to_char(sysdate,'yyyy-mm-dd hh24:mi')  where student='" + user.getCode() + "'";
			}
			//System.out.println(sql2);
			dbHelperIn.executeQuery(sql2);
		}
		return "success";
	}

	private String generateFileName(String fileName) {

		// 文件后缀 倒数第一个"."在哪里
		int position = fileName.lastIndexOf(".");
		// 取得后缀，及"."后面的字符
		String extension = fileName.substring(position);
		return "report_" + user.getCode() + extension;

	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {		
		this.title = title;
	}

	public String getFilepath() {
		return filepath;
	}

	public void setFilepath(String filepath) {
		this.filepath = filepath;
	}

	public Logger getLogger1() {
		return logger1;
	}

	public void setLogger1(Logger logger1) {
		this.logger1 = logger1;
	}

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

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

}
