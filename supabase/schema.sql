-- Run this file inside Supabase SQL Editor

create table if not exists menu_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamptz default now()
);

create table if not exists menu_items (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references menu_categories(id) on delete set null,
  name text not null,
  description text,
  price numeric(10,2) not null check (price >= 0),
  image_url text,
  is_available boolean default true,
  created_at timestamptz default now()
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_phone text not null,
  customer_address text not null,
  total_price numeric(10,2) not null check (total_price >= 0),
  status text not null default 'pending' check (status in ('pending', 'preparing', 'delivered', 'cancelled')),
  created_at timestamptz default now()
);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  menu_item_id uuid references menu_items(id) on delete set null,
  quantity int not null check (quantity > 0),
  price numeric(10,2) not null check (price >= 0),
  created_at timestamptz default now()
);

insert into menu_categories (name) values
('Appetizers'), ('Mains'), ('Desserts'), ('Drinks')
on conflict (name) do nothing;

insert into menu_items (category_id, name, description, price, image_url)
select id, 'Chicken Biryani', 'Spicy rice with tender chicken and traditional masala.', 550, 'https://images.unsplash.com/photo-1563379091339-03246963d96c?q=80&w=900&auto=format&fit=crop'
from menu_categories where name = 'Mains'
on conflict do nothing;

insert into menu_items (category_id, name, description, price, image_url)
select id, 'Zinger Burger', 'Crispy chicken burger with fresh lettuce and special sauce.', 450, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=900&auto=format&fit=crop'
from menu_categories where name = 'Mains'
on conflict do nothing;

insert into menu_items (category_id, name, description, price, image_url)
select id, 'French Fries', 'Golden crispy fries served with ketchup.', 250, 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?q=80&w=900&auto=format&fit=crop'
from menu_categories where name = 'Appetizers'
on conflict do nothing;

insert into menu_items (category_id, name, description, price, image_url)
select id, 'Chocolate Cake', 'Rich chocolate cake slice with creamy topping.', 350, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=900&auto=format&fit=crop'
from menu_categories where name = 'Desserts'
on conflict do nothing;

alter table menu_categories enable row level security;
alter table menu_items enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

create policy "Public can view categories" on menu_categories
for select using (true);

create policy "Public can view menu items" on menu_items
for select using (true);

-- Because the Express backend uses SERVICE_ROLE_KEY, it can insert/update securely from server.
-- Do not expose SERVICE_ROLE_KEY in frontend.
