package com.topic.model;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.common.database.DBHelper;

public class CustomProperties {
	private String maxrows;
	private String maxdays;
	private String linage;
	private String filepath;

	public String getMaxrows() {
		return maxrows;
	}

	public void setMaxrows(String maxrows) {
		this.maxrows = maxrows;
	}

	public String getMaxdays() {
		return maxdays;
	}

	public void setMaxdays(String maxdays) {
		this.maxdays = maxdays;
	}

	private boolean isNumeric(String key) {
		// TODO Auto-generated method stub
		Pattern pattern = Pattern.compile("[0-9]*");
		Matcher isNum = pattern.matcher(key);
		if (!isNum.matches()) {
			return false;
		}
		return true;
	}

	public CustomProperties() {
		// �������ļ��ж�ȡ����
		Properties prop = new Properties();
		String key;
		InputStream in = DBHelper.class.getClassLoader().getResourceAsStream(
				"db.properties");
		try {
			prop.load(in);
			key = prop.getProperty("maxrows").trim();
			if (isNumeric(key)) {
				this.maxrows = key;
			} else {
				this.maxrows = "5";
			}
			key = prop.getProperty("linage").trim();
			if (isNumeric(key)) {
				this.linage = key;
			} else {
				this.linage = "10";
			}

			key = prop.getProperty("maxdays").trim();
			if (isNumeric(key)) {
				this.maxdays = key;
			} else {
				this.maxdays = "31";
			}
			key = prop.getProperty("filepath").trim();
			this.filepath = key;
		} catch (IOException e) {
			this.maxrows = "5";
			this.maxdays = "31";
			this.linage = "10";
			e.printStackTrace();
		}

	}

	public String getLinage() {
		return linage;
	}

	public void setLinage(String linage) {
		this.linage = linage;
	}

	public String getFilepath() {
		return filepath;
	}

	public void setFilepath(String filepath) {
		this.filepath = filepath;
	}

}
