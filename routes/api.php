<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->group(function(){
    Route::apiResources([
        "users" => App\Http\Controllers\Api\User\UserController::class, 
        "companies" => App\Http\Controllers\Api\Company\CompanyController::class, 
        "employees" => App\Http\Controllers\Api\Employee\EmployeeController::class, 
    ]);
    Route::get("common-auth-call", [App\Http\Controllers\CommonController::class, 'getBasicAuthData']);
});
Route::post('/login',[App\Http\Controllers\Api\Auth\LoginController::class, 'login']);
Route::post('/logout',[App\Http\Controllers\Api\Auth\LoginController::class, 'logout']);