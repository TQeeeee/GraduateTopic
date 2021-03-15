package com.common.database;

import java.io.InputStream;
import java.sql.*;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.log4j.Logger;

public class DBHelper {
	// 连接对象，从jndi连接池中动态获取
	private Connection con;

	// private Logger logger1;

	public void setCon() throws SQLException {
		this.con = JndiDbcp.getConnection();
	}

	// 构造函数，从jndi连接池中获取连接
	public DBHelper() throws SQLException {
		// 从JNDI数据库连接池中获取连接
		this.con = JndiDbcp.getConnection();
	}

	/**
	 * @Description 从view中查找主键为pk、键值为value的记录，并读取数据类型为LONG RAW或者BLOB的字段field的值
	 * @return 返回字节数组
	 */
	public byte[] getBinaryData(String field, String view, String pk,
			String value) {
		// 重新定义局部变量sql
		String sql = "select " + field + " from " + view + " where " + pk
				+ "='" + value + "' ";
		ResultSet rst = null;
		Statement pst = null;
		// 缓冲区，初始化为0个字节
		byte[] buffer = new byte[0];
		try {
			// 如果连接为空，从连接池中获取数据库连接
			if (con == null) {
				con = JndiDbcp.getConnection();
			}
			// 如果不为空，则执行查询
			if (con != null) {
				pst = con.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,
						ResultSet.CONCUR_READ_ONLY);
				rst = pst.executeQuery(sql);
				// 通过移动指针，获取记录数量
				rst.last();
				int RowCount = rst.getRow();
				rst.first();
				// 如果记录存在，则进行数据缓冲并输出
				if (RowCount > 0) {
					InputStream in = null;
					in = rst.getBinaryStream(1);
					int len = 0;
					int maxLen = 0;
					byte[] newBuffer = new byte[1024];
					byte[] tempBuffer;
					while ((len = in.read(newBuffer)) != -1) {
						maxLen = maxLen + len;
						tempBuffer = new byte[maxLen];
						System.arraycopy(buffer, 0, tempBuffer, 0,
								buffer.length);
						System.arraycopy(newBuffer, 0, tempBuffer,
								buffer.length, len);
						buffer = new byte[maxLen];
						System.arraycopy(tempBuffer, 0, buffer, 0,
								tempBuffer.length);
					}
					in.close();
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			// 释放资源
			try {
				rst.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			try {
				pst.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			try {
				con.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return buffer;
	}

	/**
	 * @Description 从view中查找主键为pk、键值为value的记录，并读取数据类型为LONG RAW或者BLOB的字段field的值
	 * @return 返回字节数组
	 */
	public byte[] getBinaryDataBySql(String sql) {
		// 重新定义局部变量sql
		ResultSet rst = null;
		Statement pst = null;
		// 缓冲区，初始化为0个字节
		byte[] buffer = new byte[0];
		try {
			// 如果连接为空，从连接池中获取数据库连接
			if (con == null) {
				con = JndiDbcp.getConnection();
			}
			// 如果不为空，则执行查询
			if (con != null) {
				pst = con.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,
						ResultSet.CONCUR_READ_ONLY);
				rst = pst.executeQuery(sql);
				// 通过移动指针，获取记录数量
				rst.last();
				int RowCount = rst.getRow();
				rst.first();
				// 如果记录存在，则进行数据缓冲并输出
				if (RowCount > 0) {
					InputStream in = null;
					in = rst.getBinaryStream(1);
					int len = 0;
					int maxLen = 0;
					byte[] newBuffer = new byte[1024];
					byte[] tempBuffer;
					while ((len = in.read(newBuffer)) != -1) {
						maxLen = maxLen + len;
						tempBuffer = new byte[maxLen];
						System.arraycopy(buffer, 0, tempBuffer, 0,
								buffer.length);
						System.arraycopy(newBuffer, 0, tempBuffer,
								buffer.length, len);
						buffer = new byte[maxLen];
						System.arraycopy(tempBuffer, 0, buffer, 0,
								tempBuffer.length);
					}
					in.close();
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			// 释放资源
			try {
				rst.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			try {
				pst.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			try {
				con.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return buffer;
	}

	/**
	 * @Description 执行数据库查询
	 * @return 返回JSON格式数据
	 *         格式：{"reccount":"n","rows":[{"field":"value",...},{"field"
	 *         :"value",...}]}
	 */
	public String executeQuery(String sql) {
		String jsonString = "";// 需要返回的JSON串
		String rows = "";// 查询返回的结果记录
		ResultSet rst = null;
		Statement pst = null;
		try {
			// 获取数据库连接
			if (con == null) {
				con = JndiDbcp.getConnection();
			}
			if (con != null) {
				pst = con.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,
						ResultSet.CONCUR_READ_ONLY);
				rst = pst.executeQuery(sql);
				int recno = 1;// 行的序号
				int fieldno;// 列的序号
				String key, value;
				// 获取视图结构
				ResultSetMetaData rsmd = rst.getMetaData();
				// 先移到尾部，获取记录数量
				rst.last();
				int rowCount = rst.getRow();
				key = "reccount";
				value = String.valueOf(rowCount);
				jsonString = "{\"" + key + "\":\"" + value + "\",\"rows\":[";
				rst.first();
				while (recno <= rowCount) {
					fieldno = 1;
					String line = "";
					while (fieldno <= rsmd.getColumnCount()) {
						key = rsmd.getColumnName(fieldno).toLowerCase().trim();
						value = rst.getString(fieldno);
						// 替换"为空格
						if (value == null) {
							value = "";
						} else {
							value = value.trim();
							value = value.replace("\"", "");
							value = value.replace("\\", "");
							value = value.replace("\r", "");
							value = value.replace("\n", "");
						}
						if (fieldno == 1) {
							line = line + "\"" + key + "\":\"" + value + "\"";
						} else {
							line = line + "," + "\"" + key + "\":\"" + value
									+ "\"";
						}
						fieldno++;
					}
					if (recno == 1) {
						rows = rows + "{" + line + "}";
					} else {
						rows = rows + "," + "{" + line + "}";
					}
					recno++;
					rst.next();
				}
				key = "rows";
				value = rows;
				jsonString = jsonString + value + "]}";
				// 转换成字符串
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			// 释放资源
			try {
				rst.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			try {
				pst.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			try {
				con.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return jsonString;
	}

	/**
	 * @Description 执行数据库查询
	 * @return 返回JSON格式数据
	 *         格式：view=[{rownum:'n',field:'value',...},{rownum:'n',field:'value',.
	 *         . . } ] } 此格式适合angular使用。
	 */
	public String executeQuery(String sql, String view) {
		ResultSet rst = null;
		String list = "";
		String line = "";
		Statement pst = null;
		try {
			// 获取数据库连接
			if (con == null) {
				con = JndiDbcp.getConnection();
			}
			if (con != null) {
				pst = con.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,
						ResultSet.CONCUR_READ_ONLY);
				rst = pst.executeQuery(sql);
				list = view + "=[";
				int recno = 1;
				int i;
				ResultSetMetaData rsmd = rst.getMetaData();
				rst.last();
				int rowCount = rst.getRow();
				rst.first();
				while (recno <= rowCount) {
					i = 1;
					line = "{rownum:'" + String.valueOf(recno) + "',";
					while (i < rsmd.getColumnCount()) {
						line = line + rsmd.getColumnName(i).toLowerCase()
								+ ":'" + rst.getString(i).replace("\"", "")
								+ "',";
						i++;
					}
					line = line + rsmd.getColumnName(i).toLowerCase() + ":'"
							+ rst.getString(i) + "'}";
					if (recno == 1) {
						list = list + line;
					} else {
						list = list + "," + line;
					}
					recno++;
					rst.next();
				}
				list = list + "]";
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			// 释放资源
			try {
				rst.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			try {
				pst.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			try {
				con.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return list;
	}

	/**
	 * @Description 执行数据库查询,实际上是直接调用相关函数，由函数返回JSON
	 * @return 返回JSON格式数据
	 *         格式：{"reccount":"n","rows":[{"field":"value",...},{"field"
	 *         :"value",...}]}
	 */
	public String executeJSON(String sql) {
		String jsonString = "";// 需要返回的JSON串
		ResultSet rst = null;
		Statement pst = null;
		// logger1 = Logger.getLogger(Object.class);
		Clob clob;
		try {
			// 获取数据库连接
			if (con == null) {
				con = JndiDbcp.getConnection();
			}
			if (con != null) {
				pst = con.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,
						ResultSet.CONCUR_READ_ONLY);
				rst = pst.executeQuery(sql);
				rst.first();
				clob = rst.getClob(1);
				if (clob != null) {
					jsonString = clob.getSubString((long) 1,
							(int) clob.length());
					jsonString = jsonString.replace("\n", "");
					jsonString = jsonString.replace("\\", "");
					jsonString = jsonString.replace("\r", "");
					jsonString = jsonString.replace("\t", "");
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			// 释放资源
			try {
				rst.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			try {
				pst.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			try {
				con.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return jsonString;
	}

	public void closeConnection() {
		try {
			con.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	/**
	 * @Description 执行数据库更新操作
	 * @return 返回JSON格式数据 格式：{"reccount":"n"},n=-1表示出错
	 */
	public String executeUpdate(String sql) {
		String jsonString = "";// 需要返回的JSON串
		int rowCount = 0;
		Statement pst = null;
		try {
			// 获取数据库连接
			if (con == null) {
				con = JndiDbcp.getConnection();
			}
			if (con != null) {
				pst = con.createStatement();
				rowCount = pst.executeUpdate(sql);
				String key, value;
				key = "reccount";
				value = String.valueOf(rowCount);
				jsonString = "{\"" + key + "\":\"" + value + "\"}";
				// 转换成字符串
			}
		} catch (Exception e) {
			jsonString="{\"reccount\":\"-1\"}"; 			
			e.printStackTrace();
		} finally {
			try {
				pst.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			try {
				con.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return jsonString;
	}
	
	/**
	 * @Description 返回给action一个Connection对象，用来执行sql语句
	 * @Param 
	 * @return Connection对象
	 */
	public Connection getCon(){
		
		return con;
	}
	
	

	/**
	 * @Description 调用存贮过程
	 * @author obj_name:过程名,inArgs:输入参数集，json格式，{'p1':'v1','p2':'v2',...}
	 * @return 返回JSON格式数据
	 *         格式：{"reccount":"n","rows":[{"arg1":"value1",...},{"arg2"
	 *         :"value2",...}]},n=0成功，n!=0失败，n为错误代码
	 */
	public String callProcedure(String obj_name, String inArgs) {
		String jsonString = "";
		String sql;
		int rowCount = 0;
		ResultSet rst = null;
		Statement pst = null;
		CallableStatement call = null;
		String key, value;
		JSONObject jsonObject, objArg, objInArg;
		objInArg = JSONObject.fromObject(inArgs);
		JSONArray arrayArgs;
		String argList;
		try {
			// 获取数据库连接
			if (con == null) {
				con = JndiDbcp.getConnection();
			}
			if (con != null) {
				pst = con.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,
						ResultSet.CONCUR_READ_ONLY);
				// 读取参数清单
				sql = "select get_arguments('" + obj_name + "') args from dual";
				rst = pst.executeQuery(sql);
				// 读取参数清单，将其转换成json对象
				rst.first();
				argList = rst.getString(1);
				jsonObject = JSONObject.fromObject(argList);
				// 此查询一定会返回1条记录
				rowCount = -1;
				rowCount = jsonObject.getInt("reccount");
				if (rowCount == 0) {
					arrayArgs = jsonObject.getJSONArray("rows");
					// 拼装调用过程的sql语句
					sql = "{call " + obj_name + "(";
					// 预留参数个数
					for (int i = 0; i < arrayArgs.size(); i++) {
						if (i == 0) {
							sql = sql + "?";
						} else {
							sql = sql + ",?";
						}
					}
					sql = sql + ")}";
					System.out.println("Call:" + sql);
					call = con.prepareCall(sql);
					for (int i = 0; i < arrayArgs.size(); i++) {
						objArg = (JSONObject) arrayArgs.getJSONObject(i);
						if (objArg.getString("in_out").equals("in")) {
							call.setString(i + 1, objInArg.getString(objArg
									.getString("name")));
						} else {
							call.registerOutParameter(i + 1,
									java.sql.Types.VARCHAR);
						}
					}
					call.execute();
					for (int i = 0; i < arrayArgs.size(); i++) {
						objArg = (JSONObject) arrayArgs.getJSONObject(i);
						if (objArg.getString("in_out").equals("out")) {
							if (jsonString.length() == 0) {
								jsonString = jsonString + "{\""
										+ objArg.getString("name") + "\":\""
										+ call.getString(i + 1) + "\"}";
							} else {
								jsonString = jsonString + ",{\""
										+ objArg.getString("name") + "\":\""
										+ call.getString(i + 1) + "\"}";
							}
						}
					}
					System.out.print(jsonString);
				}
				// 转换成字符串
				key = "reccount";
				value = String.valueOf(rowCount);
				jsonString = "{\"" + key + "\":\"" + value + "\",\"rows\":["
						+ jsonString + "]}";
			}
		} catch (Exception e) {
			// 转换成字符串
			key = "reccount";
			rowCount = -1;
			value = String.valueOf(rowCount);
			jsonString = "{\"" + key + "\":\"" + value + "\",\"rows\":["
					+ jsonString + "]}";
			e.printStackTrace();
		} finally {
			try {
				pst.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			try {
				con.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return jsonString;
	}
}
