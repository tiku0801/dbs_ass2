# HƯỚNG DẪN SỬ DỤNG
# Công nghệ sử dụng:
* Frontend: HTML, CSS, JavaScript, ReactJs
* Backend: Java, Spring Framework, MySQL 
# Yêu cầu về phần mềm:
Máy phải cài đặt đủ các phần mềm sau:
* Môi trường Java jdk 21
* Môi trường Apache Maven latest version
* Môi trường NodeJs latest version
* Hệ quản trị MySQL latest version
# Chạy chương trình
### Chạy server:
* Từ folder chính, chọn đường dẫn đến backend:
```
cd backend/
```
* Để kết nối với database, tìm đến file application.properties: nhập lệnh sau trên terminal:
```
cd src\main\resources\application.properties
```
* Thay đổi thông tin các dòng sau theo cấu hình từng máy:
```
spring.datasource.url=jdbc:mysql://localhost:3306/dbs_web?createDatabaseIfNotExist=true
-- đường dẫn đến nối đến hệ cơ sở dữ liệu
spring.datasource.username=
-- username của hệ quản trị
spring.datasource.password=
-- password của hệ quản trị
```
* Nhập lệnh sau trên terminal:
```
mvn clean install
mvn spring-boot:run
```
### Chạy client:
* Từ foler chính, chọn đường dẫn đến frontend:
```
cd frontend/
```
* Nhập lệnh sau trên terminal
```
npm i
npm start
```
