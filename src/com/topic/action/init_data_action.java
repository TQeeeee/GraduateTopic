package com.topic.action;

import java.util.Map;

import com.common.database.DBHelper;
import com.topic.model.User;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.apache.struts2.interceptor.ServletRequestAware;

public class init_data_action extends ActionSupport implements
		ServletRequestAware {
	private static final long serialVersionUID = -344269495766229918L;
	private HttpServletRequest request;
	private String result;
	private String error;
	private Logger logger1;
	public void setServletRequest(HttpServletRequest arg0) {
		this.request = arg0;
	}

	public init_data_action(){
		super();
		logger1 = Logger.getLogger(init_data_action.class);
	}
	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	/**
	 * 功能：获取词典型模型的代码与名称
	 * 
	 * @param code
	 *            :模型中的外键，通常是模型中对应的分类标志，如果为'none'则不分类
	 * @param model
	 *            :模型名，对应相应的表名
	 * @return 通过result变量返回json串
	 *         格式为：{"reccount":"n","rows":["code":"xxx","name","yyyy"]}
	 */
	public String getModel() {
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
			String key = request.getParameter("code");
			String model = request.getParameter("model");
			logger1.warn("key:"+key+model);
			if ((key != null) && (model != null)) {
				String sql = "";
				if (model.equals("major")) {
					sql = "select id as code,name from major order by id";
				}
				if(model.equals("role")){
					sql = "select code,name from t_sysrole order by code";
				}
			
				logger1.warn("init:"+sql);
				DBHelper dbHelper;
				dbHelper = new DBHelper();
				result = dbHelper.executeQuery(sql);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}

	/*
	 * 功能：获取当前用户可操作菜单清单
	 */
	public String getmenus() {
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
						String key = request.getParameter("code");
						String model = request.getParameter("model");
						logger1.warn("key:"+key+model);
						if ((key != null) && (model != null)) {
							String sql = "";
							if (model.equals("sysmenu")) {
								sql = "select code ,title as name from t_sysmenu order by code";
							}
						
							logger1.warn("init:"+sql);
							DBHelper dbHelper;
							dbHelper = new DBHelper();
							result = dbHelper.executeQuery(sql);
						}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}
	/*
	 * 功能：获取当前用户可操作菜单清单
	 */
	public String get_menus() {
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
			String usercode = user.getCode();
			String sql = "";
			sql = "select get_menus('" + usercode + "') from dual";
			logger1.warn("sql:" + sql);
			DBHelper dbHelper;
			dbHelper = new DBHelper();
			result = dbHelper.executeJSON(sql);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}

	/*
	 * 功能：获取当前用户可操作角色清单
	 */
	//getroles//////////////
	/////////////////
	public String getroles() {
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
			String key = request.getParameter("code");
			String model = request.getParameter("model");
			logger1.warn("key:"+key+model);
			if ((key != null) && (model != null)) {
				String sql = "";
				if (model.equals("sysrole")) {
					sql = "select code ,name from t_sysrole order by code";
				}
			
				logger1.warn("init:"+sql);
				DBHelper dbHelper;
				dbHelper = new DBHelper();
				result = dbHelper.executeQuery(sql);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}
	
	//////////
	//////
	/////////getusers
	public String getusers() {
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
			String key = request.getParameter("code");
			String model = request.getParameter("model");
			logger1.warn("key:"+key+model);
			if ((key != null) && (model != null)) {
				String sql = "";
				if (model.equals("sysuser")) {
					sql = "select code ,name from t_sysuser order by code";
				}
			
				logger1.warn("init:"+sql);
				DBHelper dbHelper;
				dbHelper = new DBHelper();
				result = dbHelper.executeQuery(sql);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}
	
	
	
	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}
}
