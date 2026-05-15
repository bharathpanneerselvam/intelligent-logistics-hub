import pandas as pd
import numpy as np

df = pd.read_csv("raw_sales.csv")

print("\n===== ORIGINAL DATA =====\n")
print(df)

print("\n===== DATA INFO =====\n")
print(df.info())

print("\n===== MISSING VALUES =====\n")
print(df.isnull().sum())

df.drop_duplicates(inplace=True)

df["quantity"] = df["quantity"].fillna(df["quantity"].median())

df["price"] = df["price"].fillna(df["price"].median())


df["date"] = pd.to_datetime(
    df["date"],
    format="mixed",
    errors="coerce"
)

df = df.dropna(subset=["date"])


df["quantity"] = df["quantity"].astype(int)

df["price"] = df["price"].astype(float)


df["normalized_price"] = (
    (df["price"] - df["price"].min())
    /
    (df["price"].max() - df["price"].min())
)


df.to_csv(
    "cleaned_sales.csv",
    index=False
)

print("\n===== CLEANED DATA =====\n")
print(df)

print("\ncleaned_sales.csv generated successfully")