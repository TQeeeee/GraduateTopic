package com.topic.action;

import java.util.Map;
import java.io.*;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.apache.struts2.interceptor.ServletRequestAware;

import com.common.database.DBHelper;
import com.topic.model.User;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.topic.model.CustomProperties;

public class system_settings extends ActionSupport implements ServletRequestAware {
	private String rows;
	private String maxdays;
	private String linage;
	private String message;
	private CustomProperties custom;
	private HttpServletRequest request;
	private Logger logger1;
	private String result;
	private String result1;
	private String result2;

	public String getResult2() {
		return result2;
	}

	public void setResult2(String result2) {
		this.result2 = result2;
	}

	public String getResult1() {
		return result1;
	}

	public void setResult1(String result1) {
		this.result1 = result1;
	}

	private String error;

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}

	public system_settings() {
		super();
		logger1 = Logger.getLogger(system_settings.class);
		custom = new CustomProperties();
	}

	/**
	 * 查询角色信息清单 结果以json格式返回，通过result读写
	 * 
	 * @return SUCCESS
	 */
	public String role_manage() {
		try {
			// 用户检验
			User user;
			ActionContext context = ActionContext.getContext();
			Map session = context.getSession();
			user = (User) session.get("user");
			if (user == null) {
				error = "用户登录后太长时间没有操作，请重新登录！";
				setResult("{\"reccount\":\"-1\",\"rows\":\"" + error + "\"}");
				return SUCCESS;
			}
			if (!user.audit("role_manage")) {
				error = "你没有此操作的权限，请重新登录！";
				setResult("{\"reccount\":\"-1\",\"rows\":\"" + error + "\"}");
				return SUCCESS;
			}
			DBHelper dbHelper;
			dbHelper = new DBHelper();
			String sql = "";
			sql = "select * from t_sysrole order by code";
			logger1.warn("sql=" + sql);
			setResult(dbHelper.executeQuery(sql));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}

	////////// role_privs
	public String role_privs() {
		try {
			// 用户检验
			User user;
			ActionContext context = ActionContext.getContext();
			Map session = context.getSession();
			user = (User) session.get("user");
			if (user == null) {
				error = "用户登录后太长时间没有操作，请重新登录！";
				setResult("{\"reccount\":\"-1\",\"rows\":\"" + error + "\"}");
				return SUCCESS;
			}
			if (!user.audit("role_privs")) {
				error = "你没有此操作的权限，请重新登录！";
				setResult("{\"reccount\":\"-1\",\"rows\":\"" + error + "\"}");
				return SUCCESS;
			}

			String json = request.getParameter("keyword");
			JSONObject jsonObject = JSONObject.fromObject(json);
			logger1.warn("keyword=" + json);
			String userid = jsonObject.getString("userid");
			String word = jsonObject.getString("word");

			DBHelper dbHelper;
			dbHelper = new DBHelper();
			String sql = "";
			sql = "select * from t_sysrole_privs where role='" + userid + "' order by role";
			logger1.warn("sql=" + sql);
			setResult(dbHelper.executeQuery(sql));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}

	///////////// user_privs 用户授权
	public String user_privs() {
		try {
			// 用户检验
			User user;
			ActionContext context = ActionContext.getContext();
			Map session = context.getSession();
			user = (User) session.get("user");
			if (user == null) {
				error = "用户登录后太长时间没有操作，请重新登录！";
				setResult("{\"reccount\":\"-1\",\"rows\":\"" + error + "\"}");
				return SUCCESS;
			}
			if (!user.audit("user_privs")) {
				error = "你没有此操作的权限，请重新登录！";
				setResult("{\"reccount\":\"-1\",\"rows\":\"" + error + "\"}");
				return SUCCESS;
			}
			String json = request.getParameter("keyword");
			JSONObject jsonObject = JSONObject.fromObject(json);
			logger1.warn("keyword=" + json);
			String usercode = jsonObject.getString("usercode");
			String word = jsonObject.getString("word");

			DBHelper dbHelper;
			dbHelper = new DBHelper();
			String sql = "";
			sql = "select usercode ,name,role  from t_sysrole t1 join t_sysuser_role t2 on t1.code=t2.role where t2.usercode='"
					+ usercode + "'";
			logger1.warn("sql=" + sql);
			setResult(dbHelper.executeQuery(sql));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}

	////////////////// saveuser_privs saveuser_privs
	public String saveuser_privs() {
		try {
			// 用户检验
			User user;
			ActionContext context = ActionContext.getContext();
			Map session = context.getSession();
			user = (User) session.get("user");
			if (user == null) {
				error = "用户登录后太长时间没有操作，请重新登录！";
				setResult("{\"reccount\":\"-1\",\"rows\":\"" + error + "\"}");
				return SUCCESS;
			}
			if (!user.audit("user_privs")) {
				error = "你没有此操作的权限，请重新登录！";
				setResult("{\"reccount\":\"-1\",\"rows\":\"" + error + "\"}");
				return SUCCESS;
			}
			String json = request.getParameter("keyword");
			JSONObject jsonObject = JSONObject.fromObject(json);
			logger1.warn("keyword=" + json);
			String usercode = jsonObject.getString("usercode");
			String role = jsonObject.getString("role");
			String role_old = jsonObject.getString("role_old");
			String command = jsonObject.getString("command").toLowerCase();

			DBHelper dbHelper;
			dbHelper = new DBHelper();
			String sql = "";
			logger1.warn("usercode=" + usercode);
			logger1.warn("role=" + role);

			if (command.equals("ins")) {
				sql = "insert into t_sysuser_role (usercode,role) values ('" + usercode + "','" + role + "')";
			}
			if (command.equals("upd")) {
				sql = "update t_sysuser_role  set role='" + role + "' where usercode='" + usercode + "' and role= '"
						+ role_old + "' ";
			}
			if (command.equals("del")) {
				sql = "delete from  t_sysuser_role where usercode='" + usercode + "'" + "and" + " role='" + role + "'";
			}
			logger1.warn("sql=" + sql);
			result = dbHelper.executeUpdate(sql);
			// setResult(dbHelper.executeQuery(sql));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}

	/**
	 * 功能：自动读取所有用户信息，结果以json格式返回，通过result读写 参数：usertype-用户类别，0-教师，1-学生
	 * 
	 * @return SUCCESS
	 */
	public String user_manage() {
		try {
			// 用户检验
			User user;
			ActionContext context = ActionContext.getContext();
			Map session = context.getSession();
			user = (User) session.get("user");
			if (user == null) {
				error = "用户登录后太长时间没有操作，请重新登录！";
				setResult("{\"reccount\":\"-1\",\"rows\":\"" + error + "\"}");
				return SUCCESS;
			}
			if (!user.audit("user_manage")) {
				error = "你没有此操作的权限，请重新登录！";
				setResult("{\"reccount\":\"-1\",\"rows\":\"" + error + "\"}");
				return SUCCESS;
			}
			// = request.getParameter("keyword");
			String json = request.getParameter("keyword");
			JSONObject jsonObject = JSONObject.fromObject(json);
			logger1.warn("keyword=" + json);
			String usertype = jsonObject.getString("usertype");
			String word = jsonObject.getString("word");

			DBHelper dbHelper;
			dbHelper = new DBHelper();
			String sql = "";
			String exps = "";
			if (word.length() > 0) {
				exps = " where code='" + word + "' or name like '" + word + "%'";
			}
			if (usertype.equals("0")) {
				sql = "select * from v_teacher" + exps + " order by code";
			} else {
				sql = "select * from v_student" + exps + " order by code";
			}
			logger1.warn("sql=" + sql);
			setResult(dbHelper.executeQuery(sql));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}

	/**
	 * 功能：保存数据，数据源是json格式，格式为{"field":"value",...}
	 */
	public String saveRole() {
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
			String pk = jsonObject.getString("pk");
			String command = jsonObject.getString("command").toLowerCase();
			DBHelper dbHelper;
			dbHelper = new DBHelper();
			String sql = "";
			logger1.warn("pk=" + pk);
			String code;
			String name;
			if (command.equals("upd")) {
				code = jsonObject.getString("code");
				name = jsonObject.getString("name");
				sql = "update t_sysrole  set code='" + code + "',name='" + name + "' where code='" + pk + "'";
			}
			if (command.equals("ins")) {
				code = jsonObject.getString("code");
				name = jsonObject.getString("name");
				sql = "insert into t_sysrole (code,name) values ('" + code + "','" + name + "')";
			}
			if (command.equals("del")) {
				sql = "delete from  t_sysrole where code='" + pk + "'";
			}
			logger1.warn("sql=" + sql);
			result = dbHelper.executeUpdate(sql);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}

	/**
	 * 功能：读取所查询用户的role信息
	 * 
	 */
	public String getUserRole() {
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
			// 防止其他用户通过url访问当前页面
			if (!user.audit("user_privs")) {
				error = "你没有此操作的权限，请重新登录！";
				setResult("{\"reccount\":\"-1\",\"rows\":\"" + error + "\"}");
				return SUCCESS;
			}
			String json = request.getParameter("keyword");
			JSONObject jsonObject = JSONObject.fromObject(json);
			logger1.warn("keyword=" + json);
			String word = jsonObject.getString("word");

			DBHelper dbHelper;
			dbHelper = new DBHelper();
			String sql = "";
			String exps = "";
			if (word.length() > 0) {
				exps = " where usercode='" + word + "' or username like '" + word + "%'";
			}

			sql = "select * from v_sysuser_role" + exps + "";

			logger1.warn("sql=" + sql);
			setResult(dbHelper.executeQuery(sql));

		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}

	/**
	 * 功能：用户授权，更改用户role信息
	 */
	public String saveUserRole() {

		return SUCCESS;
	}

	/**
	 * 功能：批量新增教师，学生 参数：{"usertype":"","users":[{},{}]}
	 * 返回值：{"usertype":"","succount":"","failcount":"","rows":[{},{}]}
	 * 要插入三张表,teacher/student,t_sysuser,t_sysuser_role
	 */
	public String importUser() {
		// 校验是否有操作权限

		// 获取前端的数据
		String json = request.getParameter("keyword");
		JSONObject jsonObject = JSONObject.fromObject(json);
		logger1.warn("keyword=" + json);
		String usertype = jsonObject.getString("usertype");
		JSONArray jsonArray = JSONArray.fromObject(jsonObject.getString("users"));
		// JSONArray jsonArray = jsonObject.getJSONArray("users");
		// 根据用户角色插入数据库
		if (usertype.equals("teacher")) {
			int sucCount = 0; // 执行成功的总条数
			int failCount = 0; // 执行失败的总条数
			JSONArray errorRows = new JSONArray(); // 未插入成功结果集
			// 要返回给前端的json数据
			JSONObject tempobj = null;
			Connection Conn = null;
			Statement stmt = null;
			try {
				DBHelper dbHelper = new DBHelper();
				// 获取数据库连接
				Conn = dbHelper.getCon();
				// 不自动提交
				Conn.setAutoCommit(false);
				stmt = Conn.createStatement();
				String sql_1 = new String();
				String sql_2 = new String();
				String sql_3 = new String();
				// 利用循环插入数据
				for (int i = 0; i < jsonArray.size(); i++) {
					tempobj = jsonArray.getJSONObject(i);
					try {
						sql_1 = "insert into t_sysuser(code,name,pwd,isvalid)values('" + tempobj.getString("code")
						+ "'," + "'" + tempobj.getString("name") + "','123456','1')";
						
						sql_2 = "insert into teacher(usercode,major,maximun,t_level,t_type)" + "values('"
								+ tempobj.getString("code") + "',(select id from major where name='"
								+ tempobj.getString("major") + "')," + "'" + tempobj.getInt("maxnum") + "','"
								+ tempobj.getString("level") + "','" + tempobj.getString("type") + "')";

						sql_3 = "insert into t_sysuser_role(usercode,role)values('" + tempobj.getString("code")
								+ "','20')";
						logger1.warn("sql_1=" + sql_1);
						logger1.warn("sql_2=" + sql_2);
						logger1.warn("sql_3=" + sql_3);
						stmt.addBatch(sql_1);
						stmt.addBatch(sql_2);
						stmt.addBatch(sql_3);
						stmt.executeBatch();
						Conn.commit();
						sucCount++;
						stmt.clearBatch();
					} catch (SQLException e) {
						Conn.rollback();
						failCount++;
						errorRows.add(tempobj.toString());
					} catch (Exception ec) {
						ec.printStackTrace();
					}
				}

			} catch (SQLException se) {
				se.printStackTrace();
			} catch (Exception ee) {
				ee.printStackTrace();
			} finally {
				// 以下两个try不要放在一起，就这样给他分开，因为两个资源都需要关闭，如果放在一起，当一个关闭失败时，直接就执行了catch,另一个就不会被关闭
				try {
					if (stmt != null)
						stmt.close();
				} catch (SQLException e) {

					e.printStackTrace();
				}
				try {
					if (Conn != null)
						Conn.close();
				} catch (SQLException e) {

					e.printStackTrace();
				}
			}
			tempobj.clear();
			tempobj.put("usertype", "teacher");
			tempobj.put("succount", String.valueOf(sucCount));
			tempobj.put("failcount", String.valueOf(failCount));
			tempobj.put("rows", errorRows);
			result = tempobj.toString();
			System.out.println("result is:" + result);
		}
		if (usertype.equals("student")) {
			int sucCount = 0; // 执行成功的总条数
			int failCount = 0; // 执行失败的总条数
			JSONArray errorRows = new JSONArray(); // 未插入成功结果集
			// 要返回给前端的json数据
			JSONObject tempobj = null;
			Connection Conn = null;
			Statement stmt = null;
			try {
				DBHelper dbHelper = new DBHelper();
				// 获取数据库连接
				Conn = dbHelper.getCon();
				// 不自动提交
				Conn.setAutoCommit(false);
				stmt = Conn.createStatement();
				String sql_1 = new String();
				String sql_2 = new String();
				String sql_3 = new String();
				// 利用循环插入数据
				for (int i = 0; i < jsonArray.size(); i++) {
					tempobj = jsonArray.getJSONObject(i);
					try {
						
						sql_1 = "insert into t_sysuser(code,name,pwd,isvalid)values('" + tempobj.getString("code")
						+ "'," + "'" + tempobj.getString("name") + "','123456','1')";

						sql_2 = "insert into student(usercode,major)" + "values('" + tempobj.getString("code") + "','"
								+ tempobj.getString("major") + "')";

						sql_3 = "insert into t_sysuser_role(usercode,role)values('" + tempobj.getString("code")
								+ "','80')";
						logger1.warn("sql_1=" + sql_1);
						logger1.warn("sql_2=" + sql_2);
						logger1.warn("sql_3=" + sql_3);
						stmt.addBatch(sql_1);
						stmt.addBatch(sql_2);
						stmt.addBatch(sql_3);
						stmt.executeBatch();
						Conn.commit();
						sucCount++;
						stmt.clearBatch();
					} catch (SQLException e) {
						Conn.rollback();
						failCount++;
						errorRows.add(tempobj.toString());
					} catch (Exception ec) {
						ec.printStackTrace();
					}
				}

			} catch (SQLException se) {
				se.printStackTrace();
			} catch (Exception ee) {
				ee.printStackTrace();
			} finally {
				// 以下两个try不要放在一起，就这样给他分开，因为两个资源都需要关闭，如果放在一起，当一个关闭失败时，直接就执行了catch,另一个就不会被关闭
				try {
					if (stmt != null)
						stmt.close();
				} catch (SQLException e) {

					e.printStackTrace();
				}
				try {
					if (Conn != null)
						Conn.close();
				} catch (SQLException e) {

					e.printStackTrace();
				}
			}
			tempobj.clear();
			tempobj.put("usertype", "student");
			tempobj.put("succount", String.valueOf(sucCount));
			tempobj.put("failcount", String.valueOf(failCount));
			tempobj.put("rows", errorRows);
			result = tempobj.toString();
			System.out.println("result is:" + result);
		}

		return SUCCESS;
	}

	/**
	 * 功能：单独新增系统管理员，教务人员，教师或学生 参数：
	 */

	/**
	 * 功能：修改用户密码
	 */
	public String updatePassword() {
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
			String json = request.getParameter("keyword");
			logger1.warn("json=" + json);
			JSONObject jsonObject = JSONObject.fromObject(json);
			String oldPassword = jsonObject.getString("oldPassword");
			String newPassword = jsonObject.getString("newPassword");
			String newPasswordCheck = jsonObject.getString("newPasswordCheck");
			DBHelper dbHelper;
			dbHelper = new DBHelper();
			String sql = "";
			sql = "update t_sysuser set pwd='" + newPassword + "' where code='" + user.getCode() + "'";
			logger1.warn("sql=" + sql);
			result = dbHelper.executeUpdate(sql);
			setResult(result);
			System.out.println("update_password::" + result);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}

	/**
	 * 功能：对用户操作（教师，学生要从三张表中删除，管理员和教务人员从两张表中删除，如果已经申报了选题就不可以删除）
	 * 
	 * 参数：{"usertype":"teacher/student/admin/staff","code":"xxx","command":"insert/update/delete"}
	 * 返回值：{"result":"success/fail"}
	 */
	public String operateUser(){
		// 获取前端的数据
		String json = request.getParameter("keyword");
		JSONObject jsonObject = JSONObject.fromObject(json);
		logger1.warn("keyword=" + json);
		String usertype = jsonObject.getString("usertype");
		String code = jsonObject.getString("code");
		String command = jsonObject.getString("command");
		if(usertype.equals("teacher")){
			if(command.equals("insert")){
				
			}else if(command.equals("update")){
				
			}else if(command.equals("delete")){
				
			}else if(command.equals("resetPassword")){
				
			}
			
		}
		if(usertype.equals("student")){
			if(command.equals("insert")){
				
			}else if(command.equals("update")){
				
			}else if(command.equals("delete")){
				
			}else if(command.equals("resetPassword")){
				
			}
			
		}
		
		
		
		return SUCCESS;
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
}
