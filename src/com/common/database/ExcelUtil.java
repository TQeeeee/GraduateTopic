package com.common.database;

import com.topic.model.CustomProperties;
import com.topic.model.User;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.LinkedList;
import java.util.List;


/**
 * 
 * @Description 对excel文件进行解析
 * @author YangTianQi
 *
 */

public class ExcelUtil {
	/**
	 * 获取工作簿对象
	 * @param file,fileName
	 * @return Workbook
	 */
	
	private static Workbook getWorkbook(File file,String fileName){
        try
        {
           if(fileName.equals("")){
        	 return null;  
           }else{
        	   String suffix = fileName.substring(fileName.lastIndexOf(".")+1);
        	   if(suffix.equals("xls")){
        		   return new HSSFWorkbook(new FileInputStream(file));
        	   }else if(suffix.equals("xlsx")){
        		   return new XSSFWorkbook(new FileInputStream(file));
        	   }
        	   
           }
        }
        catch (IOException e)
        {
            e.printStackTrace();
            return null;
        }
		return null;
		
	} 
	

	
	
	/**
	 * 获取表
	 * 
	 */
	
	public static Sheet getSheet(File file,String fileName,int sheetIndex){
		return getWorkbook(file,fileName).getSheetAt(sheetIndex);
	}
	
	/**
	 * 获取表的数目
	 */
	public static int getNumberOfSheet(File file,String fileName){
		return getWorkbook(file,fileName).getNumberOfSheets();
	}
	

	/**
	 * 获取单元格的内容
	 * @param sheet
	 * @param rowIndex
	 * @param cellIndex
	 * @return String
	 */
	
    public static String getCellValue(Sheet sheet, int rowIndex,int cellIndex){
    	sheet.getRow(rowIndex).getCell(cellIndex).setCellType(Cell.CELL_TYPE_STRING);
        return sheet.getRow(rowIndex).getCell(cellIndex).getStringCellValue();
    }
	
	
   
    
	
	
}
