package com.topic.action;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.apache.struts2.interceptor.ServletRequestAware;

import com.common.database.DBHelper;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.topic.model.CustomProperties;
import com.topic.model.User;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class topic_manage extends ActionSupport implements ServletRequestAware {

	private String rows;
	private String maxdays;
	private String linage;
	private String message;
	private CustomProperties custom;
	private HttpServletRequest request;
	private Logger logger1;
	private String result;   
	private String error;

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}

	public topic_manage() {
		super();
		logger1 = Logger.getLogger(system_settings.class);
		custom = new CustomProperties();
	}

	/**
	 * 功能：根据用户编号确定用户类型 返回值：{usertype:student/teacher}
	 */
	public String userType_check() {
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
			DBHelper dbHelper;
			dbHelper = new DBHelper();
			String sql = "";
			String check;

			sql = "select * from student where usercode='" + user.getCode() + "'";
			logger1.warn("sql=" + sql);
			check = dbHelper.executeQuery(sql);
			JSONObject jsonObject = JSONObject.fromObject(check);
			if (jsonObject.getString("reccount").equals("1")) {
				setResult("{\"usertype\":\"student\"}");
			} else {
				setResult("{\"usertype\":\"teacher\"}");
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}

	/**
	 * 模块一：申报选题
	 */
	// 函数名：submittedTopic_look
	/**
	 * 功能：查看本人已提交的选题 参数：keyword{usertype:student/teacher}，返回值：json数据
	 **/
	public String submittedTopic_look() {
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
			// 获取数据
			String json = request.getParameter("keyword");
			logger1.warn("json=" + json);
			JSONObject jsonObject = JSONObject.fromObject(json);
			String usertype = jsonObject.getString("usertype");
			DBHelper dbHelper;
			dbHelper = new DBHelper();
			String sql = "";
			if (usertype.equals("student")) {
				sql = "select * from v_student_title where code = '" + user.getCode() + "' ";
				logger1.warn("sql=" + sql);
				setResult(dbHelper.executeQuery(sql));
			}
			if (usertype.equals("teacher")) {
				sql = "select * from v_teacher_title where code = '" + user.getCode() + "' ";
				logger1.warn("sql=" + sql);
				setResult(dbHelper.executeQuery(sql));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}

	// 函数名：submittedTopic_save
	/**
	 * 功能：保存对已提交选题的操作,数据源是json格式，格式为{"field":"value",...}
	 */
	public String submittedTopic_save() {
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
			String usertype = jsonObject.getString("usertype");
			String pk = jsonObject.getString("pk");
			String title = jsonObject.getString("title");
			String major = jsonObject.getString("major");
			String summary = jsonObject.getString("summary");
			String command = jsonObject.getString("command").toLowerCase();
			DBHelper dbHelper;
			dbHelper = new DBHelper();
			String sql = "";
			logger1.warn("usertype=" + usertype);
			logger1.warn("pk=" + pk);
			if (usertype.equals("student")) {
				if (command.equals("upd")) {
					sql = "update student_title  set title='" + title + "',major='" + major + "',summary='" + summary
							+ "',state=0  where code='" + pk + "'";
				}
				if (command.equals("ins")) {
					if (usertype.equals("student"))
						sql = "insert into student_title (student,title,major,summary) values ('" + user.getCode()
								+ "','" + title + "','" + major + "','" + summary + "')";
				}
				if (command.equals("del")) {
					sql = "delete from  student_title where code='" + pk + "'";
				}
			}
			if (usertype.equals("teacher")) {
				if (command.equals("upd")) {
					sql = "update teacher_title  set title='" + title + "',major='" + major + "',summary='" + summary
							+ "' where id='" + pk + "'";
				}
				if (command.equals("ins")) {
					sql = "insert into teacher_title (teacher,title,major,summary) values ('" + user.getCode() + "','"
							+ title + "','" + major + "','" + summary + "')";
				}
				if (command.equals("del")) {
					sql = "delete from  teacher_title where id='" + pk + "'";
				}
			}
			logger1.warn("sql=" + sql);
			result = dbHelper.executeUpdate(sql);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}

	/**
	 * 函数名：teacherMajor_look 功能：获取教师专业方向和专业方向编号
	 **/
	public String teacherMajor_look() {
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
			DBHelper dbHelper;
			dbHelper = new DBHelper();
			String sql = "";
			sql = "select majorcode,major from v_teacher where code = '" + user.getCode() + "' ";
			logger1.warn("sql=" + sql);
			setResult(dbHelper.executeQuery(sql));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}

	/**
	 * 功能：查看可选的教师/学生选题
	 */

	public String unconfirmedTopic_look() {
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

			String json = request.getParameter("keyword");
			JSONObject jsonObject = JSONObject.fromObject(json);
			logger1.warn("keyword=" + json);
			String word = jsonObject.getString("word");
			String usertype = jsonObject.getString("usertype");
			String choose = jsonObject.getString("choose");
			// 获取数据库连接
			DBHelper dbHelper;
			dbHelper = new DBHelper();
			String sql = "";
			String exps = "";
			if (usertype.equals("teacher")) {
				if (choose.equals("0")) {
					if (word.length() > 0) {
						exps = " where teacher='" + user.getCode() + "' and name like '" + word + "%' or major like '"
								+ word + "%' or title like '" + word + "%'";
						sql = "select * from v_teacher_choosed" + exps + " order by id";
					} else {
						sql = "select * from v_teacher_choosed where teacher='" + user.getCode() + "'";
					}
				}
				if (choose.equals("1")) {
					if (word.length() > 0) {
						exps = " where name like '" + word + "%' or major like '" + word + "%' or title like '" + word
								+ "%'";
						sql = "select * from v_teacher_choice" + exps + " order by code";
					} else {
						sql = "select * from v_teacher_choice";
					}
				}

			}
			if (usertype.equals("student")) {
				if (choose.equals("0")) {
					if (word.length() > 0) {
						exps = " where student='" + user.getCode() + "' and name like '" + word + "%' or major like '"
								+ word + "%' or title like '" + word + "%'";
						sql = "select * from v_student_choosed" + exps + " order by id";
					} else {
						sql = "select * from v_student_choosed where student='" + user.getCode() + "'";
					}
				}
				if (choose.equals("1")) {
					if (word.length() > 0) {
						exps = " where name like '" + word + "%' or major like '" + word + "%' or title like '" + word
								+ "%'";
						sql = "select * from v_student_choice" + exps + " order by id";
					} else {
						sql = "select * from v_student_choice";
					}
				}
			}
			logger1.warn("sql=" + sql);
			setResult(dbHelper.executeQuery(sql));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}

	/**
	 * 选择，删除，确认选题
	 */
	public String confirmingTopic_save() {
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
			String usertype = jsonObject.getString("usertype");
			// pk:confirm表的记录编号
			String pk = jsonObject.getString("pk");
			// title:选题编号
			String code = jsonObject.getString("code");
			String command = jsonObject.getString("command").toLowerCase();
			DBHelper dbHelper;
			dbHelper = new DBHelper();
			String sql = "";
			logger1.warn("usertype=" + usertype);
			logger1.warn("pk=" + pk);
			if (usertype.equals("teacher")) {
				if (command.equals("upd")) {
					sql = "update student_confirm  set state=1  where id='" + pk + "'";
				}
				if (command.equals("ins")) {
					sql = "insert into teacher_confirm (teacher,student_title) values ('" + user.getCode() + "','"
							+ code + "')";
				}
				if (command.equals("del")) {

					sql = "delete from  teacher_confirm where id='" + pk + "'";
				}
			}
			if (usertype.equals("student")) {
				if (command.equals("upd")) {
					sql = "update teacher_confirm  set state=1  where id='" + pk + "'";
				}
				if (command.equals("ins")) {
					sql = "insert into student_confirm (student,teacher_title) values ('" + user.getCode() + "','"
							+ code + "')";
				}
				if (command.equals("del")) {
					// 若师生互认则会删除失败
					sql = "delete from  student_confirm where id='" + pk + "'";
				}
			}

			logger1.warn("sql=" + sql);
			result = dbHelper.executeUpdate(sql);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}

	/**
	 * 功能：师生互认时，查看：待学生确认，待教师确认，师生已互认 参数：choose: 0-待学生确认,1-待教师确认,2-师生已互认
	 * usertype:student/teacher
	 */
	public String confirmingTopic_look() {
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

			String json = request.getParameter("keyword");
			JSONObject jsonObject = JSONObject.fromObject(json);
			logger1.warn("keyword=" + json);
			String usertype = jsonObject.getString("usertype");
			String choose = jsonObject.getString("choose");
			// 获取数据库连接
			DBHelper dbHelper;
			dbHelper = new DBHelper();
			String sql = "";
			if (usertype.equals("teacher")) {
				// 教师查看自己已选择，待学生确认的学生选题
				if (choose.equals("0"))
					sql = "select * from v_teacher_teaconfirmed where teacher='" + user.getCode() + "'";
				// 教师查看学生已选，待自己确认的选题
				if (choose.equals("1"))
					sql = "select * from v_teacher_stuconfirmed where teacher='" + user.getCode() + "'";
				// 教师查看已师生互认的选题
				if (choose.equals("2"))
					sql = "select * from v_teacher_twoconfirmed where teacher='" + user.getCode() + "'";
			}
			if (usertype.equals("student")) {
				if (choose.equals("0"))
					// 学生查看被教师选择，待自己确认的选题
					sql = "select * from v_student_teaconfirmed where student='" + user.getCode() + "'";
				if (choose.equals("1"))
					// 学生查看自己选择，待教师确认的选题
					sql = "select * from v_student_stuconfirmed where student='" + user.getCode() + "'";
				if (choose.equals("2"))
					sql = "select * from v_student_twoconfirmed where student='" + user.getCode() + "'";
			}
			logger1.warn("sql=" + sql);
			setResult(dbHelper.executeQuery(sql));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}

	/**
	 * 功能：调用选题评审分配的存储过程
	 */
	public String topicAllocating() {
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

			// 获取数据库连接
			DBHelper dbHelper;
			dbHelper = new DBHelper();

			JSONObject arg = new JSONObject();
			String exps = dbHelper.callProcedure("prg_topic_allocating", arg.toString());
			logger1.warn("call Result:" + exps);
			setResult(exps);
			exps = "";

		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}

	/**
	 * 功能：查看评审选题 参数：choose:0-待评审，1-已评审
	 */
	public String evaluteTopic_look() {

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

			String json = request.getParameter("keyword");
			JSONObject jsonObject = JSONObject.fromObject(json);
			logger1.warn("keyword=" + json);
			String usertype = jsonObject.getString("usertype");
			String choose = jsonObject.getString("choose");
			// 获取数据库连接
			DBHelper dbHelper;
			dbHelper = new DBHelper();
			String sql = "";
			if (usertype.equals("teacher")) {
				// 教师查看待评审的选题
				if (choose.equals("0"))
					sql = "select id,title,major,summary,score,remark,state from v_teacher_evalute_topic where teacher='"
							+ user.getCode() + "' and state=0";
				// 教师查看已评审的选题
				if (choose.equals("1"))
					sql = "select id,title,major,summary,score,remark,state from v_teacher_evalute_topic where teacher='"
							+ user.getCode() + "' and state!=0";

			}
			if (usertype.equals("admin")) {
				// 管理员查看所有待评审的选题
				if (choose.equals("0"))
					sql = "select title,major,summary,score,remark from v_teacher_evalute_topic where state=0";
				if (choose.equals("1"))
					sql = "select title,major,summary,score,remark from v_teacher_evalute_topic where state!=0";
			}

			logger1.warn("sql=" + sql);
			setResult(dbHelper.executeQuery(sql));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}

	/**
	 * 功能：更改评审结果
	 */

	public String evaluteTopic_save() {
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

			// pk:title_evalute表的记录编号
			String pk = jsonObject.getString("pk");
			int score = jsonObject.getInt("score");
			String remark = jsonObject.getString("remark");

			DBHelper dbHelper;
			dbHelper = new DBHelper();
			String sql = "";
			logger1.warn("pk=" + pk);
			sql = "update title_evalute set remark='" + remark + "', score='" + score + "' ,state=1 where id='" + pk
					+ "'";
			logger1.warn("sql=" + sql);
			result = dbHelper.executeUpdate(sql);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}

	/**
	 * 功能：将前端传入的数据插入数据库 返回值：返回JSON格式数据 格式：
	 * {"succount":"n","failCount":"m","rows":[{"major":"","teacher":"","title":"","summary":""},{}]}
	 * rows:插入失败的选题
	 */
	public String saveTopic() {
		
		String json = request.getParameter("keyword");
		logger1.warn("json:" + json);
		System.out.println("json的字符串:"+json);
		JSONArray jsonArray = JSONArray.fromObject(json);
		JSONObject jsonObject = null;
		logger1.warn("json=" + json);
		int sucCount = 0; // 执行成功的总条数
		int failCount = 0; // 执行失败的总条数
		JSONArray errorRows = new JSONArray(); // 未插入成功结果集
		try {
			// 利用循环逐条插入数据库
			DBHelper dbHelper = new DBHelper();
			// 获取数据库连接
			Connection Con = dbHelper.getCon();
			Statement pst = Con.createStatement();
			String sql = "";
			for (int i = 0; i < jsonArray.size(); i++) {
				jsonObject = jsonArray.getJSONObject(i);
				try {
					sql = "insert into teacher_title(major,teacher,title,summary) values((select id from major where name='"
							+ jsonObject.getString("major") + "'),(select code from v_teacher where name='"
							+ jsonObject.getString("teacher") + "'),'" + jsonObject.getString("title") + "','"
							+ jsonObject.getString("summary") + "')";
					logger1.warn("sql=" + sql);
					if (pst.executeUpdate(sql) == 1)
						sucCount++;
				} catch (SQLException e) {
					failCount++;
					errorRows.add(jsonObject.toString());
				}
			}
			pst.close();
			Con.close();
		}catch(SQLException se) {		
			se.printStackTrace();
		}catch(Exception e){
			e.printStackTrace();
		}
		jsonObject.clear();
		jsonObject.put("succount", String.valueOf(sucCount));
		jsonObject.put("failCount", String.valueOf(failCount));
		jsonObject.put("rows",errorRows);
		result = jsonObject.toString();
		System.out.println("result is:" + result);

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
