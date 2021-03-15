package com.topic.action;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.sql.SQLException;
import java.util.Map;

import com.common.database.DBHelper;
import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionContext;
import com.topic.model.CustomProperties;
import com.topic.model.User;

import net.sf.json.JSONObject;

public class DownloadAction {

	private String fileName;

	public String execute() {
		return Action.SUCCESS;
	}

	public InputStream getInputStream() throws FileNotFoundException, SQLException {
		
		CustomProperties custom = new CustomProperties();
		// 获取路径
		String realPath = custom.getFilepath();
		return new FileInputStream(new File(realPath, fileName));
	}

	public String getFileName() throws SQLException {
		/*User user;
		ActionContext context = ActionContext.getContext();
		Map session = context.getSession();
		user = (User) session.get("user");
		DBHelper dbHelper1 = new DBHelper();
		String sql1 = "select filepath from report where student='" + user.getCode() + "'";
		String result = dbHelper1.executeQuery(sql1);
		JSONObject jsonObject = JSONObject.fromObject(result);
		String fileName=jsonObject.getString("filepath");*/
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

}