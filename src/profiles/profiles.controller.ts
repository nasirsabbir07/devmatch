import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile';
import { UpdateProfileDto } from './dto/update-profile';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
  constructor(private profileService: ProfilesService) {}
  @Get()
  findAll() {
    return this.profileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(id);
  }

  @Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.createProfile(createProfileDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.updateProfile(id, updateProfileDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    this.profileService.deleteProfile(id);
  }
}
