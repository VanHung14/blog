# blog được viết bằng restful API sử dụng NodeJs, ExpressJs, MongoDB.
 File export database được lưu vào data/seed.
 
 Hệ thống cho phép người dùng (User) đăng ký, đăng nhập tài khoản . Thông tin tài khoản có các trường sau: email, password, userName, age, gender, isAdmin, post_ids.
 
 Hệ thống có sẵn các danh mục bài viết (Category). Thông tin về danh mục có các trường sau: name, avatar, post_ids. Mỗi danh mục có thể có nhiều bài viết, mỗi bài
viết chỉ thuộc 1 danh mục duy nhất.

 User có thể tạo các bài viết (Post) trên hệ thống. Thông tin mỗi bài viết có các trường sau: title, description, content, status (“draft”, “public”), avatar, idcategory.
Mỗi người dùng có thể tạo nhiều bài viết, mỗi bài viết chỉ thuộc về duy nhất một người dùng.

Các chức năng chính:
- Đăng nhập, đăng ký tài khoản (sử dụng authentication, jwt để lưu thông tin user mỗi khi đăng nhập, jwt được lưu ở cookies). Email là trường để định danh người dùng (sử dụng attribute unique : true trong Schema)
- Chỉnh sửa thông tin tài khoản (Bao gồm thay đổi mật khẩu - mật khẩu được mã hóa bằng bcrypt). Email không thể thay đổi ( admin có thể edit thông tin tất cả nhân viên sử dụng authorization, nhân viên chỉ có thể edit thông tin cá nhân)
- Hiển thị danh sách các bài viết theo người dùng hoặc xem tất cả bài viết của mọi người. Phân chia thành 3 loại:
  1. ALL: Tất cả bài viết
  2. DRAFT: Bài viết ở trạng thái nháp
  3. PUBLIC: Bài viết đã công khai
- Tạo bài viết mới. Người dùng có thể lưu nháp hoặc công khai bài viết ( lấy thông tin user từ cookie, lưu bài viết theo user đó, hình ảnh được convert sang Binary lưu vào MongoDB, và lưu vào 1 đường dẫn public/img/ )
- Chỉnh sửa một bài viết. ( sử dụng [put] chỉ chỉnh sửa được bài viết cá nhân,  lấy thông tin user, decoded token từ cookie)
- Chuyển trạng thái bài viết giữa công khai và lưu nháp. ( sử dụng [patch] )
- Xoá một bài viết ( lấy thông tin user từ cookie, chỉ xóa được bài viết cá nhân)
- Hiển thị danh sách bài viết theo danh mục

