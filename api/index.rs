use http::{Request, Response, StatusCode, header};

fn handler(request: Request<()>) -> http::Result<Response<String>> {
    let response = Response::builder()
        .status(StatusCode::OK)
        .header(header::CONTENT_TYPE, "text/plain")
        .body("sup".to_string())
        .expect("failed to render response");

    Ok(response)
}