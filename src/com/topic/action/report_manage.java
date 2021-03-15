package com.topic.action;

import java.io.File;
import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.io.FileUtils;
import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.ServletRequestAware;

import com.common.database.DBHelper;
import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.topic.model.CustomProperties;
import com.topic.model.User;

import net.sf.json.JSONObject;

public class report_manage extends ActionSupport implements
ServletRequestAware{
	private String rows;
	private String linage;
	private String message;
	private CustomProperties custom;
	private HttpServletRequest request;
	private Logger logger1;
	private String result;
	private String error;
	private Integer rscore;
	private String rremark;
	
	public report_manage(){
		super();
		logger1 = Logger.getLogger(report_manage.class);
		custom = new CustomProperties();		
	}
	/**
	 * 管理员查看开题报告评审结果
	 * 
	 */
	public String report_result_list() {
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
			sql = "select ts.usercode,s.name,s.major,ts.title,ts.teachername,r.score,r.remark from v_teacher_student_title ts,v_report r ,v_student s where ts.USERCODE=r.USERCODE and s.code=r.usercode";
			logger1.warn("sql=" + sql);
			setResult(dbHelper.executeQuery(sql));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}
	
	
	
	
	public String report_submit_list() {
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
			/*if (!user.audit("role_manage")) {
				error = "你没有此操作的权限，请重新登录！";
				setResult("{\"reccount\":\"-1\",\"rows\":\"" + error + "\"}");
				return SUCCESS;
			}*/
			DBHelper dbHelper;
			dbHelper = new DBHelper();						
			String sql = "select * from v_report r where usercode='" + user.getCode() + "'";
			logger1.warn("sql=" + sql);
			setResult(dbHelper.executeQuery(sql));	
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
		
	}
	
	
	public String report_review_list() {
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
			
			 DBHelper dbHelper = new DBHelper();			
			 String sql = "select code,re.state,report,title,remark,re.score,filepath from report_evaluate re,report r where re.report=r.code and teacher='"
					+ user.getCode() + "'";
			logger1.warn("sql=" + sql);
			setResult(dbHelper.executeQuery(sql));	
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}
	
	
	public String report_allocating_list() {
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
			JSONObject arg=new JSONObject();			
			String exps = dbHelper.callProcedure("prg_report_allocating", arg.toString());
			logger1.warn("call Result:"+exps);
			setResult(exps);
			exps="";
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}

	public String saveReport() {
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
			DBHelper dbHelper;
			dbHelper = new DBHelper();			
			logger1.warn("pk=" + pk);
			String score = jsonObject.getString("score");
			String remark = jsonObject.getString("remark");
			String sql = "update report_evaluate  set score='" + score + "',remark='" + remark + "',state='1' where  report='"
					+  pk+ "'";
			logger1.warn("sql=" + sql);
			result = dbHelper.executeUpdate(sql);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}
	
	/**
	 * 功能：查看待评审或已评审的开题报告
	 * 参数：0-待评审，1-已评审
	 */
	public String evaluteReport_look(){	
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
			
			String choose = jsonObject.getString("choose");
			String usertype = jsonObject.getString("usertype");
			//获取数据库连接
			DBHelper dbHelper;
			dbHelper = new DBHelper();
			String sql = "";
			
			if(usertype.equals("admin")){
				//管理员查看所有待评审的开题报告
				if(choose.equals("0"))
					sql="select * from v_admin_evaluate_report where state=0";
				if(choose.equals("1"))
					sql="select * from v_admin_evaluate_report where state!=0";
			}	
			if(usertype.equals("teacher")){
				//教师查看所有待评审的开题报告
				if(choose.equals("0"))
					sql="select * from v_teacher_evaluate_report where state=0 and teacher='"+user.getCode()+"'";
				if(choose.equals("1"))
					sql="select * from v_teacher_evaluate_report where state!=0 and teacher='"+user.getCode()+"'";
			}
				
			
			logger1.warn("sql=" + sql);
			setResult(dbHelper.executeQuery(sql));
		} catch (Exception e) {
			e.printStackTrace();
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

	public Logger getLogger1() {
		return logger1;
	}

	public void setLogger1(Logger logger1) {
		this.logger1 = logger1;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}

	

	public Integer getRscore() {
		return rscore;
	}

	public void setRscore(Integer rscore) {
		this.rscore = rscore;
	}

	public String getRremark() {
		return rremark;
	}

	public void setRremark(String rremark) {
		this.rremark = rremark;
	}
	
}
