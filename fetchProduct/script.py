import requests
import csv
import time

BASE_URL = "https://patchkraze.com/products.json"
OUTPUT_FILE = "patchkraze_products.csv"

all_products = []
page = 1

while True:
    url = f"{BASE_URL}?limit=250&page={page}"

    print(f"Fetching page {page}...")

    response = requests.get(url)

    if response.status_code != 200:
        print("Failed:", response.status_code)
        break

    data = response.json().get("products", [])

    if not data:
        print("No more products found.")
        break

    all_products.extend(data)

    print(f"Fetched {len(data)} products")

    page += 1
    time.sleep(1)

print(f"Total products fetched: {len(all_products)}")

# Save CSV
with open(OUTPUT_FILE, "w", newline="", encoding="utf-8") as csvfile:
    writer = csv.writer(csvfile)

    writer.writerow([
        "id",
        "title",
        "handle",
        "vendor",
        "product_type",
        "tags",
        "price",
        "sku",
        "image"
    ])

    for product in all_products:

        title = product.get("title", "")
        handle = product.get("handle", "")
        vendor = product.get("vendor", "")
        product_type = product.get("product_type", "")
        tags = product.get("tags", "")

        variants = product.get("variants", [])
        first_variant = variants[0] if variants else {}

        price = first_variant.get("price", "")
        sku = first_variant.get("sku", "")

        images = product.get("images", [])
        first_image = images[0]["src"] if images else ""

        writer.writerow([
            product.get("id", ""),
            title,
            handle,
            vendor,
            product_type,
            tags,
            price,
            sku,
            first_image
        ])

print(f"Saved to {OUTPUT_FILE}")