# blog
 Hệ thống cho phép người dùng (User) đăng ký, đăng nhập tài khoản. Thông tin tài khoản có các trường sau: email, password, userName, age, gender, isAdmin, post_ids
- Hệ thống có sẵn các danh mục bài viết (Category). Thông tin về danh mục có các trường sau: name, avatar, post_ids. Mỗi danh mục có thể có nhiều bài viết, mỗi bài
viết chỉ thuộc 1 danh mục duy nhất
- User có thể tạo các bài viết (Post) trên hệ thống. Thông tin mỗi bài viết có các trường sau: title, description, content, status (“draft”, “public”), avatar.
Mỗi người dùng có thể tạo nhiều bài viết, mỗi bài viết chỉ thuộc về duy nhất một người dùng

Các chức năng chính:
a. Đăng nhập, đăng ký tài khoản. Email là trường để định danh người dùng
b. Chỉnh sửa thông tin tài khoản (Bao gồm thay đổi mật khẩu). Email không thể thay đổi
c. Hiển thị danh sách các bài viết theo người dùng. Phân chia thành 3 loại:
- ALL: Tất cả bài viết
- DRAFT: Bài viết ở trạng thái nháp
- PUBLIC: Bài viết đã công khai
d. Tạo bài viết mới. Người dùng có thể lưu nháp hoặc công khai bài viết
e. Chỉnh sửa một bài viết.
f. Chuyển trạng thái bài viết giữa công khai và lưu nháp
g. Xoá một bài viết
h. Hiển thị danh sách bài viết theo danh mục
file export database được lưu vào data/seed