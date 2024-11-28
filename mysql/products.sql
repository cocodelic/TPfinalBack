CREATE TABLE Products( 
    id INT AUTO_INCREMENT,
    seller_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(40) NOT NULL, 
    active BOOLEAN NOT NULL DEFAULT TRUE,
    image_base64 LONGTEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    FOREIGN KEY(seller_id) REFERENCES Users(id)
    );


CREATE TABLE Users(
    id INT AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    role VARCHAR(255) NOT NULL DEFAULT 'user',
    active BOOLEAN NOT NULL DEFAULT true,
    is_verified BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY(id)
    )

CREATE TABLE Cart(
    product_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY(product_id) REFERENCES Products(id),
    FOREIGN KEY(user_id) REFERENCES Users(id) 
)