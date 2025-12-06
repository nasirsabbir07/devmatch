import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateProfileDto } from './dto/create-profile';
import { UpdateProfileDto } from './dto/update-profile';

@Injectable()
export class ProfilesService {
  private profiles = [
    {
      id: randomUUID(),
      name: 'Nasir Uddin',
      description: `Nasir is a skilled Fullstack Developer.
He specializes in building scalable web applications
using NestJS, React, and TypeScript.`,
    },
    {
      id: randomUUID(),
      name: 'Amina Rahman',
      description: `Amina is a creative Frontend Developer.
She focuses on building responsive and user-friendly
interfaces with React and Tailwind CSS.`,
    },
    {
      id: randomUUID(),
      name: 'Rafiq Hossain',
      description: `Rafiq is a backend expert with Node.js.
He builds robust APIs and manages databases
using NestJS and PostgreSQL.`,
    },
  ];

  findAll() {
    return this.profiles;
  }

  findProfile(id: string) {
    const matchingProfile = this.profiles.find((profile) => profile.id === id);
    if (!matchingProfile) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }
  }

  createProfile(createProfileDto: CreateProfileDto) {
    const createdProfile = {
      id: randomUUID(),
      ...createProfileDto,
    };

    this.profiles.push(createdProfile);
    return createdProfile;
  }

  updateProfile(id: string, updateProfileDto: UpdateProfileDto) {
    const matchingProfile = this.profiles.find(
      (existingProfile) => existingProfile.id === id,
    );
    if (!matchingProfile) {
      return {};
    }
    matchingProfile.name = updateProfileDto.name;
    matchingProfile.description = updateProfileDto.description;
    return matchingProfile;
  }

  deleteProfile(id: string): void {
    const matchingProfileIndex = this.profiles.findIndex(
      (profile) => profile.id === id,
    );
    if (matchingProfileIndex > -1) {
      this.profiles.splice(matchingProfileIndex, 1);
    }
  }
}
