-- 为缺少图片的新闻添加图片URL
UPDATE news 
SET featured_image_url = 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=ASUPET%20company%20milestone%20celebration%2C%20modern%20office%20environment%2C%20team%20achievement%2C%20professional%20corporate%20setting&image_size=landscape_16_9'
WHERE id = '8b5e7c2a-9f3d-4e1a-b6c8-7d9e0f1a2b3c';

UPDATE news 
SET featured_image_url = 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=ASUPET%20research%20and%20development%20laboratory%2C%20scientists%20working%20on%20pet%20nutrition%2C%20modern%20lab%20equipment%2C%20innovation&image_size=landscape_16_9'
WHERE id = 'f4a8b2c6-3e7d-4f9a-8b1c-5d6e9f0a2b4c';

UPDATE news 
SET featured_image_url = 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=pet%20nutrition%20trends%20media%20coverage%2C%20newspaper%20and%20digital%20media%2C%20ASUPET%20brand%20visibility%2C%20industry%20leadership&image_size=landscape_16_9'
WHERE id = '20802030-21b2-410f-a669-7c0562e12c72';