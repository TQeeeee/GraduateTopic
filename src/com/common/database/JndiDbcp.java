package com.common.database;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

/**
 * @ClassName: JndiDbcp
 * @Description: 数据库连接池，利用Tomcat JNDI数据库连接池，需要配置连接
 * @author: 原创：孤傲苍狼，欧阳皓修改
 * @date: 原创：2014-10-4 下午6:04:36，修改时间：2016年7月1日20:56:56
 */
public class JndiDbcp {
	// 数据源，静态变量，公用
	private static DataSource ds = null;
	// 在静态代码块中创建数据库连接池，读取配置文件中的相关信息，
	// 配置信息在%JAVA_HOME&\conf\Catalina\localhost目录下的projectname.xml文件中
	static {
		try {
			// 初始化JNDI
			Context initCtx = new InitialContext();
			// 得到JNDI容器
			Context envCtx = (Context) initCtx.lookup("java:comp/env");
			// 从JNDI容器中检索name为jdbc/datasource的数据源，此名字要与配置文件一致
			ds = (DataSource) envCtx.lookup("jdbc/datasource");
		} catch (Exception e) {
			throw new ExceptionInInitializerError(e);
		}
	}

	/**
	 * @Method: getConnection
	 * @Description: 从数据源中获取数据库连接
	 * @Anthor:孤傲苍狼
	 * @return Connection
	 * @throws SQLException
	 */
	public static Connection getConnection() throws SQLException {
		// 从数据源中获取数据库连接
		return ds.getConnection();
	}
}
