package com.topic.action;


import com.topic.model.CustomProperties;
import com.topic.model.User;

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

//import javax.servlet.http.HttpSession;
//import javax.servlet.ServletContext;






public class xiangsi extends ActionSupport{
	

	private  HttpServletRequest request;
	private  File file;
	private  String fileFileName;
	private String fileContentType;
	private String result;
	private String error;
	private Logger logger1;
	private  File saveFile;
	private String targetFileName;
	public String getTargetFileName() {
		return targetFileName;
	}
	public void setTargetFileName(String targetFileName) {
		this.targetFileName = targetFileName;
	}
	public  File getSaveFile() {
		return saveFile;
	}
	public  void setSaveFile(File saveFile) {
		this.saveFile = saveFile;
	}
	private  String fileFileName_new="信息上传_";
	public Logger getLogger1() {
		return logger1;
	}
	public void setLogger1(Logger logger1) {
		this.logger1 = logger1;
	}
	public CustomProperties getCustom() {
		return custom;
	}
	public void setCustom(CustomProperties custom) {
		this.custom = custom;
	}
	private CustomProperties custom;
	public String getError() {
		return error;
	}
	public void setError(String error) {
		this.error = error;
	}
	private  String last11;
	public String getLast11() {
		return last11;
	}
	public void setLast11(String last11) {
		this.last11 = last11;
	}
	public String getLast22() {
		return last22;
	}
	public void setLast22(String last22) {
		this.last22 = last22;
	}
	private  String last22;

	
	public String getResult() {
		return result;
	}
	public void setResult(String result) {
		this.result = result;
	}
	
	
	public  String getFileFileName_new() {
		return fileFileName_new;
	}
	public File getFile() {
		return file;
	}
	public  void setFile(File file) {
		this.file = file;
	}
	public  String getFileFileName() {
		return fileFileName;
	}
	public  void setFileFileName(String fileFileName) {
		this.fileFileName = fileFileName;
	}
	public  String getFileContentType() {
		return fileContentType;
	}
	public  void setFileContentType(String fileContentType) {
		this.fileContentType = fileContentType;
	}

	
	
	public  HttpServletRequest getRequest() {
		return request;
	}


	public  void setRequest(HttpServletRequest request) {
		this.request = request;
	}
	
	public void setFileFileName_new(String fileFileName_new) {
		this.fileFileName_new = fileFileName_new;
	}
	private  String generateFileName(String fileFileName2) {	
		fileFileName_new=fileFileName_new+fileFileName2;
		return fileFileName_new;
	}	
	public xiangsi(){
		super();
		logger1 = Logger.getLogger(xiangsi.class);
		custom = new CustomProperties();		
	}
	
	  public String execute1() throws Exception{
		  User user;
		  ActionContext context = ActionContext.getContext();
			Map session = context.getSession();
			user = (User) session.get("user");
			
			if (user == null) {
				error = "用户登录后太长时间没有操作，请重新登录！";
				setResult("{\"key\":\"-1\",\"rows\":\"" + error + "\"}");
				return SUCCESS;
			}
			if (!user.audit("user_manage")) {
				error = "你没有此操作的权限，请重新登录！";
				setResult("{\"key\":\"-1\",\"rows\":\"" + error + "\"}");
				return SUCCESS;
			}
		try { 
	    //webroot下的绝对路径/exsl_path
		String realPath=ServletActionContext.getServletContext().getRealPath("/exsl_path");
		//System.out.println("ytqTest:realPath="+realPath+"");
		//System.out.println("ytqTest:fileName="+fileFileName+"");
		setTargetFileName("/"+fileFileName);
		
		//System.out.println("ggogogogo");
		if(file!=null) {	
				//根据 parent 抽象路径名和 child 路径名字符串创建一个新 File 实例。
				File saveFile=new File(new File(realPath),fileFileName);
				if(saveFile.exists()){
					saveFile.delete();
				}
				//父路径不存在
				if(!saveFile.getParentFile().exists())
					{saveFile.getParentFile().mkdirs();}

				
				String aa=realPath+getTargetFileName();
		            if(aa!= null && !"".equals(aa)){
		            	String Suffix = aa.substring(aa.lastIndexOf(".")+1);//得到点后面的后缀，不包括点
		            	System.out.println(aa);
		                // 工作簿
		            	Workbook xwb = null;
		            	if (Suffix.equals("xlsx"))
		            		xwb = new XSSFWorkbook(new FileInputStream(aa));
		            	else if (Suffix.equals("xls"))
		            		xwb = new HSSFWorkbook(new FileInputStream(aa));
		            	else
		            		return null;	//不是excel文件则退出
		            	// 表格
		                Sheet sheet = null;
		                // 行
		                Row row = null;
		                // 单元格
		                Cell cell = null;
		                // 表
		                sheet = (Sheet) xwb.getSheetAt(0);
		                ArrayList<imformation_teacher> sheetList1 = new ArrayList<imformation_teacher>();
		                int last = sheet.getPhysicalNumberOfRows();
		                last11=String.valueOf(last);
		                setLast11(String.valueOf(last11));
		                
		                for(int i = sheet.getFirstRowNum()+1; i < last; i++){
		                    // 获取第i行
		                    row = sheet.getRow(i);
		                    // 生成一个实例
		                    imformation_teacher c = new imformation_teacher();
		                    // 依此获取单元格放入对象t中
		                    int  lastc = row.getPhysicalNumberOfCells();
		                    for(int j = row.getFirstCellNum(); j < lastc; j++){
		                        // 获取第i行第j列的单元格，
		                        cell = row.getCell(j++);
		                        cell.setCellType(Cell.CELL_TYPE_STRING);
		                        c.setUsercode(cell.getStringCellValue());
		                        
		                        cell = row.getCell(j++);
		                        cell.setCellType(Cell.CELL_TYPE_STRING);
		    					c.setName(cell.getStringCellValue());
		    					
		                        cell = row.getCell(j++);
		                        cell.setCellType(Cell.CELL_TYPE_STRING);
		    					c.setMajor(cell.getStringCellValue());
		    					
		                        cell = row.getCell(j++);
		                        cell.setCellType(Cell.CELL_TYPE_STRING);
		                        c.setT_level(cell.getStringCellValue());
		    					
		                        cell = row.getCell(j++);
		                        cell.setCellType(Cell.CELL_TYPE_STRING);
		    					c.setT_type(cell.getStringCellValue());
		    					
		                        cell = row.getCell(j++);
		                        cell.setCellType(Cell.CELL_TYPE_STRING);
		                        c.setMaximun(cell.getStringCellValue() );
		    					
		                        cell = row.getCell(j++);
		                        cell.setCellType(Cell.CELL_TYPE_STRING);
		                        c.setPwd(cell.getStringCellValue());
		                        
		                        //System.out.println(cell.getStringCellValue());
		                        
		                        cell = row.getCell(j++);
		                        cell.setCellType(Cell.CELL_TYPE_STRING);
	                            String isvalid=cell.getStringCellValue(); 
	                            /*char a=1;
	                            if(isvalid=="否") { a=0;}	*/         				    
	                            c.setIsvalid(isvalid);

		                    }
		                    // 将对象c添加到集合中
		                    sheetList1.add(c);
		                    setSheetList1(sheetList1);
		                }
		                xwb.close();
		                //System.out.println("!");
		                		               		                
		            }
		       	 Gson gson1=new Gson();
				 Gson gson2=new Gson();
					
					String usertype="0";
					String word="1";
					 if(usertype.equals("0")&&word!=null) {
						 String key="reccount";
						 String value;
						 String a=getLast11();
						 System.out.println("Start Load...");
						 value=gson1.toJson(getSheetList1());
						 System.out.println("value:"+value);
						 System.out.println("Start Load111...");
						 result= "{\"" + key + "\":\"" + a + "\",\"rows\":"+ value + "}";
						 System.out.println(result);
						 request.setAttribute("result", result);
					 }
				}
		        }catch (Exception e) {
		            e.printStackTrace();
			
			} 
			return SUCCESS;
    }
	
	  public String execute2() throws Exception{
		  User user;
		  ActionContext context = ActionContext.getContext();
			Map session = context.getSession();
			user = (User) session.get("user");
			
			if (user == null) {
				error = "用户登录后太长时间没有操作，请重新登录！";
				setResult("{\"key\":\"-1\",\"rows\":\"" + error + "\"}");
				return SUCCESS;
			}
			if (!user.audit("user_manage")) {
				error = "你没有此操作的权限，请重新登录！";
				setResult("{\"key\":\"-1\",\"rows\":\"" + error + "\"}");
				return SUCCESS;
			}
			try { 
		     
			String realPath=ServletActionContext.getServletContext().getRealPath("/exsl_path");
			//String realPath=file.getAbsolutePath();
			setTargetFileName("/"+fileFileName);
			System.out.println("ggogogogo");
			if(file!=null) {
					//String a = generateFileName(getFileFileName());
					File saveFile=new File(new File(realPath),fileFileName);
					if(saveFile.exists()){
						saveFile.delete();
					}
					if(!saveFile.getParentFile().exists())
						{saveFile.getParentFile().mkdirs();}
					FileUtils.copyFile(file,saveFile);				
					//setSaveFile(saveFile1);
		/*			ActionContext.getContext().put("meg", "文件上传成功！");
					ActionContext.getContext().put("meg1", "上传的文件是:    "+fileFileName);
				//	ActionContext.getContext().put("meg2", "新的文件名是:    "+a);	
					
					
				}
				}catch (Exception e) {
		            e.printStackTrace();}
			return "success";
		}*/	
		//教师信息文件解析 		
					/*public  ArrayList<imformation_teacher> execute1(String fileFileName) throws Exception{
						try { 	*/
			
					String aa=realPath+getTargetFileName();
			            if(aa!= null && !"".equals(aa)){
			            	String Suffix = aa.substring(aa.lastIndexOf(".")+1);//得到点后面的后缀，不包括点
			            	System.out.println(aa);
			                // 工作簿
			            	Workbook xwb = null;
			            	if (Suffix.equals("xlsx"))
			            		xwb = new XSSFWorkbook(new FileInputStream(aa));
			            	else if (Suffix.equals("xls"))
			            		xwb = new HSSFWorkbook(new FileInputStream(aa));
			            	else
			            		return null;	//不是excel文件则退出
			            	// 表格
			            	 Sheet sheet = null;
				                // 行
				                Row row = null;
				                // 单元格
				                Cell cell = null;
				                // 表
				                sheet = (Sheet) xwb.getSheetAt(0);
				                ArrayList<imformation_student> sheetList2 = new ArrayList<imformation_student>();
				                int last = sheet.getPhysicalNumberOfRows();
				                 setLast22(String.valueOf(last));
				                for(int i = sheet.getFirstRowNum()+1; i < last; i++){
				                    // 获取第i行
				                    row = sheet.getRow(i);
				                    // 生成一个实例
				                    imformation_student c = new imformation_student();
				                    // 依此获取单元格放入对象t中
				                    int  lastc = row.getPhysicalNumberOfCells();
				                    for(int j = row.getFirstCellNum(); j < lastc; j++){
				                        // 获取第i行第j列的单元格，
				                        cell = row.getCell(j++);
				                        cell.setCellType(Cell.CELL_TYPE_STRING);
				                        c.setUsercode(cell.getStringCellValue());
				                        
				                        cell = row.getCell(j++);
				                        cell.setCellType(Cell.CELL_TYPE_STRING);
				    					c.setName(cell.getStringCellValue());
				    					
				                        cell = row.getCell(j++);
				                        cell.setCellType(Cell.CELL_TYPE_STRING);
				    					c.setMajor(cell.getStringCellValue());
				    					
				    					
				                        cell = row.getCell(j++);
				                        cell.setCellType(Cell.CELL_TYPE_STRING);
				                        c.setPwd(cell.getStringCellValue());
				    					
				                        cell = row.getCell(j++);
				                        cell.setCellType(Cell.CELL_TYPE_STRING);
			                            String isvalid=cell.getStringCellValue(); 
			                            /*char a=1;
			                            if(isvalid=="是") { a=1;}
			         				    else if(isvalid=="否") { a=0; }*/
			                            c.setIsvalid(isvalid);

				                    }
				                    // 将对象c添加到集合中
				                    sheetList2.add(c);
				                    setSheetList2(sheetList2);	
			                }
			                xwb.close();
			                //System.out.println("!");
			               	               		                
			            }
			       	 Gson gson1=new Gson();
					 Gson gson2=new Gson();
						
						
						String usertype="1";
						String word="1";
						 if(usertype.equals("1")&&word!=null) {
							 String key="reccount";
							 String value;
							 String a=getLast22();
							 System.out.println("Start Load...");
							 value=gson1.toJson(getSheetList2());
							 System.out.println("value:"+value);
							 System.out.println("Start Load111...");
							 result= "{\"" + key + "\":\"" + a + "\",\"rows\":"+ value + "}";
							 setResult(result);
							 System.out.println(result);
							 ActionContext.getContext().put("result", result);
						 }
					}
			
			        }catch (Exception e) {
			            e.printStackTrace();
				
				} 
				return SUCCESS;
	    }
	  
	
	
	
	
	private ArrayList<imformation_student> sheetList2;
	private ArrayList<imformation_teacher> sheetList1;
	public ArrayList<imformation_student> getSheetList2() {
		return sheetList2;
	}
	public void setSheetList2(ArrayList<imformation_student> sheetList2) {
		this.sheetList2 = sheetList2;
	}
	public ArrayList<imformation_teacher> getSheetList1() {
		return sheetList1;
	}
	public void setSheetList1(ArrayList<imformation_teacher> sheetList1) {
		this.sheetList1 = sheetList1;
	}
	
	
	 
	
	 

}


