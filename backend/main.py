from fastapi import Query

@app.get("/api/listings")
def get_listings(
    limit: int = Query(10, ge=1, le=100),
    offset: int = Query(0, ge=0)
):
    listings = (
        db.query(Listing)
        .order_by(Listing.created_at.desc())
        .offset(offset)
        .limit(limit)
        .all()
    )
    return listings
