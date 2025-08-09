-- Check current permissions for products table
SELECT grantee, table_name, privilege_type 
FROM information_schema.role_table_grants 
WHERE table_schema = 'public' 
AND table_name = 'products'
AND grantee IN ('anon', 'authenticated') 
ORDER BY table_name, grantee;

-- Grant permissions to anon role (for public read access)
GRANT SELECT ON products TO anon;

-- Grant full permissions to authenticated role (for admin operations)
GRANT ALL PRIVILEGES ON products TO authenticated;

-- Also grant permissions on product_categories table if needed
GRANT SELECT ON product_categories TO anon;
GRANT ALL PRIVILEGES ON product_categories TO authenticated;

-- Check permissions after granting
SELECT grantee, table_name, privilege_type 
FROM information_schema.role_table_grants 
WHERE table_schema = 'public' 
AND table_name IN ('products', 'product_categories')
AND grantee IN ('anon', 'authenticated') 
ORDER BY table_name, grantee;