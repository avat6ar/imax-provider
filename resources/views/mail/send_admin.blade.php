<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@200..1000&display=swap" rel="stylesheet">
  <title>Purchase Confirmation</title>
  <style>
    body {
      font-family: "Cairo", sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
      color: #333;
    }

    .container {
      max-width: 540px;
      background: white;
      margin: auto;
      padding: 20px;
      text-align: center;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      margin-top: 20px;
    }

    @media screen and (max-width: 540px) {
      .container {
        max-width: 100%;
      }
    }
  </style>
</head>

<body>
  <div class="container">
    <p style="color: rgba(0, 0, 0, 0.60); font-size: 18px; font-weight: 400;">{{ $textContent }}</p>
  </div>
</body>

</html>
