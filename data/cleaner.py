import pandas as pd
import numpy as np

RAW_FILE = "raw_sales.csv"
OUTPUT_FILE = "cleaned_sales.csv"


def load_data():
    try:
        df = pd.read_csv(RAW_FILE)
        print("\n✔ Data loaded successfully")
        return df
    except FileNotFoundError:
        raise FileNotFoundError(f"File not found: {RAW_FILE}")


def explore_data(df):
    print("\n===== ORIGINAL DATA =====\n")
    print(df.head())

    print("\n===== DATA INFO =====\n")
    print(df.info())

    print("\n===== MISSING VALUES =====\n")
    print(df.isnull().sum())


def clean_data(df):

    df = df.drop_duplicates()
    print("\n✔ Duplicates removed")

    if "quantity" in df.columns:
        df["quantity"] = df["quantity"].fillna(df["quantity"].median())

    if "price" in df.columns:
        df["price"] = df["price"].fillna(df["price"].median())

    print("✔ Missing values handled")

    if "date" in df.columns:
        df["date"] = pd.to_datetime(
            df["date"],
            errors="coerce"
        )
        df = df.dropna(subset=["date"])
        print("✔ Date column cleaned")


    df["quantity"] = df["quantity"].astype(int)
    df["price"] = df["price"].astype(float)

    print("✔ Data types fixed")

    df["revenue"] = df["quantity"] * df["price"]


    min_price = df["price"].min()
    max_price = df["price"].max()

    if max_price != min_price:
        df["normalized_price"] = (df["price"] - min_price) / (max_price - min_price)
    else:
        df["normalized_price"] = 0

    print("✔ Feature engineering completed")

    return df


def save_data(df):
    df.to_csv(OUTPUT_FILE, index=False)
    print(f"\n✔ Cleaned dataset saved as {OUTPUT_FILE}")


def main():
    df = load_data()
    explore_data(df)
    df = clean_data(df)
    save_data(df)

    print("\n===== CLEANED DATA PREVIEW =====\n")
    print(df.head())


if __name__ == "__main__":
    main()