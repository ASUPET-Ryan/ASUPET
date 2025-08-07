-- 为剩余缺少图片的新闻添加图片URL
UPDATE news 
SET featured_image_url = 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=ASUPET%20company%20milestone%20achievement%2C%20corporate%20success%20celebration%2C%20modern%20business%20environment%2C%20professional%20team&image_size=landscape_16_9'
WHERE id = 'ffb732ff-3f16-407f-9418-80103cb7fa5c';

UPDATE news 
SET featured_image_url = 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=ASUPET%20research%20laboratory%20innovation%2C%20pet%20nutrition%20science%2C%20advanced%20technology%2C%20scientific%20breakthrough&image_size=landscape_16_9'
WHERE id = '715020f6-c056-4c4c-a11a-0eebae062187';