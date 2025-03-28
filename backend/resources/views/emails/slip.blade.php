<!DOCTYPE html>
<html>
<head>
    <title>Payslip</title>
</head>
<body>
    <h1>Payslip for {{ $name }}</h1>
    <p>Here are the details of your payslip:</p>
    <table border="1">
        @foreach($payslipData as $key => $value)
            <tr>
                <td>{{ ucfirst($key) }}</td>
                <td>{{ $value }}</td>
            </tr>
        @endforeach
    </table>
</body>
</html>
